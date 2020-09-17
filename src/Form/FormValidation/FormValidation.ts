import IForm from "../IForm";
import Validator from "../../Protocol/Validator";
import {getFormService} from "../FormService";
import FormDefault from "../FormDefault";

export interface IFormValidation {

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
            valid = field.validation().validateWithEffect() && valid;
        }

        return valid;
    }

    getValidator(): Validator {
        return getFormService<Validator>("validator", this.form, this.form.getProps().services?.validator, FormDefault.getValidator());
    }

}