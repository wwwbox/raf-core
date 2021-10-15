import {FieldValidationConfiguration} from "../Configuration/FieldValidationConfiguration";
import {IField} from "../IField";
import {Validator} from "../../Protocol/Validator";
import {FieldConfigurationServiceBase, IFieldConfigurationService} from "../Configuration/FieldConfigurationService";
import {FieldEvents} from "../../Event/DefaultEvents";

export interface FieldValidator extends IFieldConfigurationService<FieldValidationConfiguration> {
    validate(): boolean;

    validateWithEffect(emitEventOnFail: boolean, afterChange?: () => void): boolean;

    set(valid: boolean, afterChange?: () => void): void;

    getCurrentValidState(): boolean;
}

export class DefaultFieldValidator extends FieldConfigurationServiceBase<FieldValidationConfiguration> implements FieldValidator {

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
        return DefaultFieldValidator.isValid(validationResult);
    }

    validateWithEffect(emitEventOnFail: boolean = true, afterChange?: () => void): boolean {
        const validationResult = this.getValidationResult();
        const valid = DefaultFieldValidator.isValid(validationResult);
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
        const value = this.getField().valueService().get();
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
        this.getField().eventService().emitOnThis(FieldEvents.VALIDATION_FAIL, {
            validationResult: validationResult
        });
    }
}