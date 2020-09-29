import IForm from "../IForm";
import {GlobalEvents} from "../../Event/DefaultEvents";

export interface IFormValue {

    set(values: any): void;

    clear(): void;

    isReady(): boolean;
}


export class FormValue implements IFormValue {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    clear(): void {
        this.form.fields().getAllRegistered().forEach(field => field.value().clear());
        this.form.event().emit(GlobalEvents.FORM_CLEARED, {});
    }

    isReady(): boolean {
        return this.form.fields().getAllRegistered().every(field => field.collecting().isReady());
    }

    set(values: any): void {
        this.form.fields().getAllRegistered().forEach(field => {
            let value = values[field.getName()];
            if (value !== undefined) {
                field.value().set(value);
            }
        })
    }

}