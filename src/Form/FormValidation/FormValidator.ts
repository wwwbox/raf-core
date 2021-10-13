import {Service} from '@autofiy/autofiyable';
import {IForm} from "../IForm";
import {Validator} from "../../Protocol/Validator";
import {GlobalEvents} from "../../Event/DefaultEvents";

export interface IFormValidator extends Service {

    validate(): boolean;

    validateWithEffect(): boolean;

    getValidator(): Validator;
}

export class FormValidator implements IFormValidator {

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

    //TODO : REMOVE THIS METHOD
    getValidator(): Validator {
        return this.form.getServiceProvider().getService<Validator>("validator");
    }

}