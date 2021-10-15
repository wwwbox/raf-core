import {FieldValidationConfiguration} from "./FieldValidationConfiguration";
import {IField} from "../IField";
import {Validator} from "../../Protocol/Validator";
import {FieldConfigurationServiceBase, IFieldConfigurationService} from "../Configuration/FieldConfigurationService";
import {FieldEvents} from "../../Event/DefaultEvents";

export interface IFieldValidation extends IFieldConfigurationService<FieldValidationConfiguration> {
    validate(): boolean;

    validateWithEffect(emitEventOnFail: boolean, afterChange?: () => void): boolean;

    set(valid: boolean, afterChange?: () => void): void;

    getCurrentValidState(): boolean;
}

export class FieldValidation extends FieldConfigurationServiceBase<FieldValidationConfiguration> implements IFieldValidation {

    private validator: Validator | null = null;

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    private static isValid(validationResult: string | boolean): boolean {
        return validationResult === true || validationResult === '';
    }

    set(valid: boolean, afterChange?: () => void): void {
        this.update('valid', valid, afterChange);
    }

    getCurrentValidState(): boolean {
        return this.config<boolean>("valid");
    }

    validate(): boolean {
        const validationResult = this.getValidationResult();
        return FieldValidation.isValid(validationResult);
    }

    validateWithEffect(emitEventOnFail: boolean = true, afterChange?: () => void): boolean {
        const validationResult = this.getValidationResult();
        const valid = FieldValidation.isValid(validationResult);
        this.set(valid, afterChange);

        if (!valid && emitEventOnFail) {
            this.emitValidationFailEvent(validationResult);
        }

        if (this.getConfiguration().updateMessageOnValidationFail) {
            this.getField().uiService().update('message', validationResult);
            this.getField().uiService().update('messageType', this.getConfiguration().onFailMessageType);
        }

        return valid;
    }

    private getValidationResult(): string | boolean {
        if (this.getConfiguration().skipValidation) {
            return true;
        }
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

    private emitValidationFailEvent(validationResult: any): void {
        this.getField().event().emitOnThis(FieldEvents.VALIDATION_FAIL, {
            validationResult: validationResult
        });
    }
}