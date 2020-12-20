import { Validator } from "../../Protocol/Validator";
import { IField } from "../IField";
import { FieldMessageType } from "../UI/FieldUIConfiguration";

export interface FieldValidationConfiguration {
    validateOnChange: boolean;
    rules: any;
    skipValidation: boolean;
    valid: boolean;
    validator: ((field: IField) => Validator) | null;
    updateMessageOnValidationFail: boolean,
    onFailMessageType: FieldMessageType;
}

export function getDefaultFieldValidationConfiguration(): FieldValidationConfiguration {
    return {
        rules: {},
        skipValidation: false,
        valid: true,
        validateOnChange: true,
        validator: null,
        updateMessageOnValidationFail: false,
        onFailMessageType: FieldMessageType.ERROR
    }
}