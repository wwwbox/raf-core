import {FieldMessageType} from "./FieldConfig";

export default interface IField extends IFieldRenderConfigure, IFieldValidationConfigure, IFieldCollectConfigure {
    getState(): any;

    setState(newState: any): void;

    clear(): void;

    getValue(): any;

    validate(): void;

    isValid(): boolean;
}


export interface IFieldRenderConfigure {
    setReadonly(readonly: boolean): void;

    setHidden(hidden: boolean): void;

    setMessage(message: string | undefined): void;

    setMessageType(type: FieldMessageType | undefined): void;

    setDisableOnLoading(disableOnLoading: boolean): void;

    isReadonly(): boolean | undefined;

    getMessage(): boolean | string;

    getMessageType(): FieldMessageType | undefined;

    isDisableOnLoading(): boolean | undefined;
}

export interface IFieldValidationConfigure {
    setValidationRules(rules: any): void;

    setEscapeValidation(escapeValidation: boolean): void;

    setValidateOnChange(validateOnChange: boolean): void;

    getValidationRules(): any;

    isEscapeValidation(): boolean | undefined;

    isValidateOnChange(): boolean | undefined;
}


export interface IFieldCollectConfigure {
    setAsQuery(asQuery: boolean): void;

    isAsQuery(): boolean | undefined;
}