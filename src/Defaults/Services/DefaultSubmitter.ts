import {Submitter} from "../../Protocol/Submitter";
import {IForm} from "../../Form/IForm";
import {RafDefaults} from "../RafDefaults";
import {Collector} from "../../Form/Services/Collector";
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

    protected constructor(form: IForm) {
        this.form = form;
    }

    getForm(): IForm {
        return this.form;
    }

    getCollector(): Collector {
        return this.form.collector();
    }

    abstract submit(): void;

    protected getDefaultOptions(): any {
        return RafDefaults.form.submitOptions;
    }

    protected getSubmitOptions(): SubmitOption {
        let options = this.getForm().getProps().extra?.submitOptions ?? {};
        options = {...this.getDefaultOptions(), ...options};
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
        if (options.autoDetectContentType && this.getCollector().hasFiles()) {
            return "multipart/form-data";
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
            return formData;
        }
        return JSON.stringify(data);
    }

}

export class DefaultSubmitter extends SubmitterBase<SubmitOptionsBase> {

    constructor(form: IForm) {
        super(form);
    }

    submit(): void {
        const xhr = new XMLHttpRequest();
        const onResponse = this.onResponse;
        xhr.onreadystatechange = function () {
            onResponse(this);
        }
        this.send(xhr);
    }

    public onResponse = (request: XMLHttpRequest) => {
        if (request.readyState === XMLHttpRequest.DONE) {
            const options = this.getSubmitOptions();
            if (options.updateUi) {
                this.getForm().uiService().stopLoading();
            }

            if (request.status < 400) {
                this.getForm().eventService().emit(GlobalEvents.SUBMIT_SUCCEEDED, {
                    options: options,
                    response: request.response
                });
            } else {
                this.getForm().eventService().emit(GlobalEvents.SUBMIT_FAILED, {
                    options: options,
                    response: request.response
                });
            }

            this.getForm().eventService().emit(GlobalEvents.SUBMIT_COMPLETED, {
                options: options,
                response: request.response
            });
        }
    }

    private send(xhr: XMLHttpRequest) {
        const options = this.getSubmitOptions();
        xhr.open(options.method, this.getUrlWithQueries(), true);
        xhr.setRequestHeader('Content-Type', this.getContentType());
        xhr.send(this.getData());

        if (options.updateUi) {
            this.getForm().uiService().startLoading();
        }
        this.getForm().eventService().emit(GlobalEvents.SUBMIT_START, {options: options});
    }
}