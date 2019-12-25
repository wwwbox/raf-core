import Validator from "../protocol/Validator";
import IField from "./IField";
import ChangeHandler from "../protocol/ChangeHandler";

export default interface FieldConfig extends FieldRenderConfig,
    FieldValidationConfig,
    FieldCollectConfig,
    FieldChangeHandlerConfig,
    FieldCommunicationConfig {
    
}

export interface FieldRenderConfig {
    readonly?: boolean;
    hidden?: boolean;
    message?: string;
    messageType?: FieldMessageType;
    disableOnLoading?: boolean;
    startingValue?: any;
}

export interface FieldValidationConfig {
    validationRules?: any;
    onValidation?: (isValid: boolean, field: IField) => boolean | undefined;
    escapeValidation?: boolean;
    validateOnChange?: boolean;
    validator?: (field: IField) => Validator;
}

export interface FieldCollectConfig {
    name: string;
    asQuery?: boolean;
    onCollect?: (collectedValue: any, field: IField) => any | undefined;
}

export interface FieldChangeHandlerConfig {
    changeHandler?: (field: IField) => ChangeHandler;
    onChange?: OnFieldChange;
    afterChange: AfterFieldChange;
}


export interface FieldCommunicationConfig {
    onOtherChange?: OnOtherChange;
    onFormReset?: any;
}

export enum FieldMessageType {
    NORMAL,
    SUCCESS,
    WARNING,
    ERROR
}

export type OnFieldChange = (event: any, field: IField) => void;
export type AfterFieldChange = (event: any, newValue: any, field: IField) => void;
export type OnOtherChange = (otherField: IField, newValue: any) => void;
