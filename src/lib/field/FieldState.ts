import {FieldMessageType} from "./FieldConfig";

export default interface FieldState {
    readonly?: boolean;
    message?: string;
    messageType?: FieldMessageType;
    disableOnLoading?: boolean;
    startingValue?: string;


    name: string;
    asQuery?: boolean;

    escapeValidation?: boolean;
    validationRules?: any;
    validateOnChange?: boolean;

    value: any;
}