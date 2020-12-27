import {Service} from '@autofiy/autofiyable';
import {IForm} from "../IForm";
import {Validator} from "../../Protocol/Validator";
import {GlobalEvents} from "../../Event/DefaultEvents";

export interface IFormValidation extends Service {

    validate(): boolean;

    validateWithEffect(): boolean;

    getValidator(): Validator;
}

export class FormValidation implements IFormValidation {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    validate(): boolean {
        return this.form.fields().getAllRegistered().every(field => field.validation().validate());
    }

    validateWithEffect(): boolean {
        let valid = true;
        for (let field of this.form.fields().getAllRegistered()) {
            valid = field.validation().validateWithEffect(false) && valid;
        }
        if (!valid) {
            this.form.event().emit(GlobalEvents.VALIDATION_FAIL, {});
        }
        return valid;
    }

    getValidator(): Validator {
        return this.form.getServiceProvider().getService<FormValidation>("validator");
    }

}