import {FieldMessageType} from "./FieldConfig";
import IForm from "../Form/IForm";
import {FieldProps} from "./FieldProps";

//TODO : move method to its own interfaces

export default interface IField extends IFieldRenderConfigure, IFieldValidationConfigure, IFieldCollectConfigure {
    getState(): any;

    extractValueFromChangeEvent(event: any): any;

    changeState(newState: any): void;

    clear(): void;

    getValue(): any;

    getName(): string;

    setValue(value: any, validateAfterChange?: boolean, afterChange?: () => void): void;

    validate(): boolean;

    isValid(): boolean;

    error(error: boolean): void;

    handleChange(e: any): void;

    isFileField(): boolean;

    getForm(): IForm;

    getListeners(): any;

    isLoading(): boolean;

    getProps(): FieldProps;

    reset(): void;
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

    shouldValidate(): boolean;

    setShouldValidate(shouldValidate: boolean): void;
}

export interface IFieldCollectConfigure {
    setAsQuery(asQuery: boolean): void;

    isAsQuery(): boolean | undefined;

    isReadyToCollect(): boolean;

    setReadyToCollect(ready: boolean): void;

    shouldCollect(): boolean;

    setShouldCollect(shouldCollect: boolean): void;
}