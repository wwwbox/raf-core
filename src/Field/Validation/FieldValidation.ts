import {FieldValidationConfiguration} from "./FieldValidationConfiguration";
import IField from "../IField";
import Validator from "../../Protocol/Validator";
import {FieldMessageType} from "../UI/FieldUIConfiguration";
import {FieldConfigurationBase, IFieldConfiguration} from "../Configuration/FieldConfiguration";

export interface IFieldValidation extends IFieldConfiguration<FieldValidationConfiguration> {
    validate(): boolean;

    validateWithEffect(afterChange?: () => void): boolean;

    set(valid: boolean, afterChange?: () => void): void;
}

export class FieldValidation extends FieldConfigurationBase<FieldValidationConfiguration> implements IFieldValidation {

    private validator: Validator | null = null;

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    set(valid: boolean, afterChange?: () => void): void {
        this.update('valid', valid, afterChange);
    }

    validate(): boolean {
        if (this.getConfiguration().skipValidation) {
            return true;
        }
        const isValid = this.getValidationResult();
        return isValid === true || isValid === '';
    }

    private getValidationResult(): string | boolean {
        const value = this.getField().value().get();
        const rules = this.getConfiguration().rules;
        return this.getValidator().validate(value, rules);
    }

    private getValidator(): Validator {
        if (this.validator) {
            return this.validator;
        }
        let validatorCallback = this.getConfiguration().validator;
        this.validator = validatorCallback ? validatorCallback(this.getField()) : this.getField().getProps().injectedValidator;
        return this.validator;
    }

    validateWithEffect(afterChange?: () => void): boolean {
        if (this.getConfiguration().skipValidation) {
            return true;
        }
        const isValid = this.getValidationResult();
        const valid = isValid === true || isValid === '';
        this.set(valid, afterChange);
        this.getField().ui().update('message', valid);
        this.getField().ui().update('messageType', FieldMessageType.ERROR);
        return false;
    }

}