import {Service} from '@autofiy/autofiyable';
import {IForm} from "../IForm";
import {FormRenderer} from "../../Protocol/FormRenderer";
import {GlobalEvents} from "../../Event/DefaultEvents";

export interface FormUIService extends Service {
    startLoading(): void;

    stopLoading(): void;

    isLoading(): boolean;

    render(): any;
}


export class DefaultFormUIService implements FormUIService {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    isLoading(): boolean {
        return this.form.getInternalState().isLoading;
    }

    startLoading(): void {
        this.form.updateInternalState({isLoading: true}, () => {
            this.form.eventService().emit(GlobalEvents.FORM_START_LOADING, {});
        });
    }

    stopLoading(): void {
        this.form.updateInternalState({isLoading: false}, () => {
            this.form.eventService().emit(GlobalEvents.FORM_END_LOADING, {});
        });
    }

    render(): any {
        const renderer = this.form.getServiceProvider().getService<FormRenderer>("formRenderer");
        return renderer.render();
    }

}