import {FieldMessageType} from "./FieldConfig";

export default interface IField extends IFieldRenderConfigure, IFieldValidationConfigure, IFieldCollectConfigure {
    getState(): any;

    changeState(newState: any): void;

    clear(): void;

    getValue(): any;

    setValue(value: any): void;

    validate(): void;

    isValid(): boolean;

    error(error: boolean): void;

    handleChange(e: any): void;

    isFileField(): boolean;
}


export interface IFieldRenderConfigure {
    setReadonly(readonly: boolean): void;

    setMessage(message: string | undefined): void;

    setMessageType(type: FieldMessageType | undefined): void;

    setDisableOnLoading(disableOnLoading: boolean): void;

    isReadonly(): boolean | undefined;

    getMessage(): undefined | string;

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