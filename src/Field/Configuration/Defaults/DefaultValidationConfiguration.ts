import {FieldMessageType} from "../FieldUIConfiguration";
import {FieldValidationConfiguration} from "../FieldValidationConfiguration";

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