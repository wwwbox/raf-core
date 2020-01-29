import { FieldMessageType } from "./FieldConfig";
export default interface FieldState {
    readonly?: boolean;
    message?: string;
    messageType?: FieldMessageType;
    disableOnLoading?: boolean;
    startingValue?: string;
    name: string;
    asQuery?: boolean;
    isReadyToCollect: boolean;
    escapeValidation?: boolean;
    validationRules?: any;
    validateOnChange?: boolean;
    value: any;
    isValid: boolean;
    isHidden: boolean;
    shouldCollect: boolean;
    shouldValidate: boolean;
}
