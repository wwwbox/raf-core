import IForm from "../IForm";
import {getFormService} from "../FormService";
import FormRenderer from "../../Protocol/FormRenderer";
import FormDefault from "../FormDefault";

export interface IFormUI {
    startLoading(): void;

    stopLoading(): void;

    isLoading(): boolean;

    render(): any;
}


export class FormUI implements IFormUI {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    isLoading(): boolean {
        return this.form.getInternalState().isLoading;
    }

    startLoading(): void {
        this.form.updateInternalState({isLoading: true});
    }

    stopLoading(): void {
        this.form.updateInternalState({isLoading: false});
    }

    render(): any {
        const renderer = getFormService<FormRenderer>("form renderer", this.form, this.form.getProps().services?.formRenderer, FormDefault.getFormRenderer())
        return renderer.render();
    }

}