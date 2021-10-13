import {Service} from '@autofiy/autofiyable';
import {IForm} from "../IForm";
import {GlobalEvents} from "../../Event/DefaultEvents";

export interface IFormValueService extends Service {

    set(values: any): void;

    clear(): void;

    isReady(): boolean;
}


export class FormValueService implements IFormValueService {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    clear(): void {
        this.form.fieldsManager().getAllRegistered().forEach(field => field.value().clear());
        this.form.eventService().emit(GlobalEvents.FORM_CLEARED, {});
    }

    isReady(): boolean {
        return this.form.fieldsManager().getAllRegistered().every(field => field.collecting().isReady());
    }

    set(values: any): void {
        this.form.fieldsManager().getAllRegistered().forEach(field => {
            let value = values[field.getName()];
            if (value !== undefined) {
                field.value().set(value);
            }
        })
    }

}