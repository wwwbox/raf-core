import {FieldMessageType} from "./FieldConfig";
import IForm from "../Form/IForm";

export default interface IField extends IFieldRenderConfigure, IFieldValidationConfigure, IFieldCollectConfigure {
    getState(): any;

    changeState(newState: any): void;

    clear(): void;

    getValue(): any;

    getName(): string;

    setValue(value: any, validateAfterChange: boolean): void;

    validate(): boolean;

    isValid(): boolean;

    error(error: boolean): void;

    handleChange(e: any): void;

    isFileField(): boolean;

    getForm(): IForm;

    getListeners(): any;
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

    isHidden(): boolean;

    setHidden(hidden: boolean): void;
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

    isReadyToCollect(): boolean;

    setReadyToCollect(ready: boolean): void;
}