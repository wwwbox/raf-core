import IForm from "../IForm";
import {getFormService} from "../FormService";
import FormRenderer from "../../Protocol/FormRenderer";
import FormDefault from "../FormDefault";
import {GlobalEvents} from "../../Event/DefaultEvents";

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
        this.form.updateInternalState({isLoading: true}, () => {
            this.form.event().emit(GlobalEvents.FORM_START_LOADING, {});
        });
    }

    stopLoading(): void {
        this.form.updateInternalState({isLoading: false}, () => {
            this.form.event().emit(GlobalEvents.FORM_END_LOADING, {});
        });
    }

    render(): any {
        const renderer = getFormService<FormRenderer>("form renderer", this.form, this.form.getProps().services?.formRenderer, FormDefault.getFormRenderer())
        return renderer.render();
    }

}