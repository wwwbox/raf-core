import Validator from "../Protocol/Validator";
import IField from "./IField";
import FieldChangeHandler from "../Protocol/FieldChangeHandler";
export default interface FieldConfig extends FieldRenderConfig, FieldValidationConfig, FieldCollectConfig, FieldChangeHandlerConfig, FieldCommunicationConfig {
    as: any;
    key?: never;
    [propName: string]: any;
}
export declare type FieldService<T> = (field: IField) => T;
export interface FieldRenderConfig {
    readonly?: boolean;
    message?: string;
    messageType?: FieldMessageType;
    disableOnLoading?: boolean;
    startingValue?: any;
}
export interface FieldValidationConfig {
    validationRules?: any;
    onValidation?: OnFieldValidation;
    escapeValidation?: boolean;
    validateOnChange?: boolean;
    validator?: FieldService<Validator>;
    shouldValidate?: boolean;
}
export declare type OnFieldValidation = (validationResult: any, field: IField) => void;
export interface FieldCollectConfig {
    name: string;
    asQuery?: boolean;
    onCollect?: OnFieldCollect;
    shouldCollect?: boolean;
}
export declare type OnFieldCollect = (collectedValue: any, field: IField) => any | undefined;
export interface FieldChangeHandlerConfig {
    changeHandler?: FieldService<FieldChangeHandler>;
    onChange?: OnFieldChange;
    afterChange?: AfterFieldChange;
}
export interface FieldCommunicationConfig {
    onOtherChange?: OnOtherChange;
    onFormReset?: any;
}
export declare enum FieldMessageType {
    NORMAL = 0,
    SUCCESS = 1,
    WARNING = 2,
    ERROR = 3
}
export declare type OnFieldChange = (event: any, field: IField) => void;
export declare type AfterFieldChange = (event: any, newValue: any, field: IField) => void;
export declare type OnOtherChange = (key: string, value: any, field: IField) => void;