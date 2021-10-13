import {Service} from '@autofiy/autofiyable';
import {IForm} from "../IForm";
import {GlobalEvents} from "../../Event/DefaultEvents";

export interface FormValidator extends Service {

    validate(): boolean;

    validateWithEffect(): boolean;
}

export class DefaultFormValidator implements FormValidator {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    validate(): boolean {
        return this.form.fieldsManager().getAllRegistered().every(field => field.validation().validate());
    }

    validateWithEffect(): boolean {
        let valid = true;
        for (let field of this.form.fieldsManager().getAllRegistered()) {
            valid = field.validation().validateWithEffect(false) && valid;
        }
        if (!valid) {
            this.form.eventService().emit(GlobalEvents.VALIDATION_FAIL, {});
        }
        return valid;
    }

}