import Submitter from "../../Protocol/Submitter";
import IForm from "../../Form/IForm";
import {RafDefaults} from "../RafDefaults";
import {IFormCollector} from "./IFormCollector";
import {GlobalEvents} from "../../Event/DefaultEvents";


export interface SubmitOptionsBase {
    contentType: string;
    autoDetectContentType: boolean;
    updateUi: boolean;
    url: string;
    method: any;
}

export const defaultSubmitOptions: SubmitOptionsBase = {
    method: "POST",
    url: "",
    updateUi: true,
    contentType: "application/json",
    autoDetectContentType: true
}

export abstract class SubmitterBase<SubmitOption extends SubmitOptionsBase> implements Submitter {

    private readonly form: IForm;
    private readonly collector: IFormCollector;

    protected constructor(form: IForm, collector: IFormCollector) {
        this.form = form;
        this.collector = collector;
    }

    getForm(): IForm {
        return this.form;
    }

    getCollector(): IFormCollector {
        return this.collector;
    }

    abstract submit(): void;

    protected getDefaultOptions(): any {
        return RafDefaults.form.submitOptions;
    }

    protected getSubmitOptions(): SubmitOption {
        let options = this.getForm().getProps().extra?.submitOptions ?? {};
        options = {...this.getDefaultOptions(), options};
        return options;
    }

    protected getUrlWithQueries(): string {
        const url = new URL(this.getSubmitOptions().url);
        const queries = this.getCollector().query();
        Object.keys(queries).forEach(key => {
            url.searchParams.append(key, queries[key]);
        });
        return url.toString();
    }

    protected getContentType(): string {
        const options = this.getSubmitOptions();
        if (options.autoDetectContentType) {
            if (this.getCollector().hasFiles()) {
                return "multipart/form-data"
            }
        }
        return options.contentType;
    }

    protected getData() {
        const data = this.getCollector().data();
        if (this.getCollector().hasFiles()) {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            const files = this.getCollector().files();
            Object.keys(files).forEach(key => formData.append(key, files[key]));
        }
        return JSON.stringify(data);
    }

}

export class DefaultSubmitter extends SubmitterBase<SubmitOptionsBase> {

    constructor(form: IForm, collector: IFormCollector) {
        super(form, collector);
    }

    submit(): void {
        const xhr = new XMLHttpRequest();
        const onResponse = this.onResponse
        xhr.onreadystatechange = function () {
            onResponse(this);
        }
        this.send(xhr);
    }

    private send(xhr: XMLHttpRequest) {
        const options = this.getSubmitOptions();
        xhr.open(options.method, options.url, true);
        xhr.setRequestHeader('Content-Type', this.getContentType());
        xhr.send(this.getData());

        if (options.updateUi) {
            this.getForm().ui().startLoading();
        }
        this.getForm().event().emit(GlobalEvents.SUBMIT_START, {options: options});
    }

    protected onResponse(request: XMLHttpRequest) {
        if (request.readyState === XMLHttpRequest.DONE) {
            const options = this.getSubmitOptions();
            if (options.updateUi) {
                this.getForm().ui().stopLoading();
            }

            if (request.status < 400) {
                this.getForm().event().emit(GlobalEvents.SUBMIT_DONE, {options: options, response: request.response});
            } else {
                this.getForm().event().emit(GlobalEvents.SUBMIT_FAIL, {options: options, response: request.response});
            }

            this.getForm().event().emit(GlobalEvents.SUBMIT_COMPLETE, {options: options, response: request.response});
        }
    }
}