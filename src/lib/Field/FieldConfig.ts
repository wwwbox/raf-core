import Validator from "../Protocol/Validator";
import IField from "./IField";
import FieldChangeHandler from "../Protocol/FieldChangeHandler";
import React from "react";

export default interface FieldConfig extends FieldRenderConfig,
    FieldValidationConfig,
    FieldCollectConfig,
    FieldChangeHandlerConfig,
    FieldCommunicationConfig {

    as: React.Component;
    key?: never;

    [propName: string]: any;
}

export type FieldService<T> = (field: IField) => T;

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
}

export type OnFieldValidation = (validationResult: any, field: IField) => void;

export interface FieldCollectConfig {
    name: string;
    asQuery?: boolean;
    onCollect?: OnFieldCollect;
}

export type OnFieldCollect = (collectedValue: any, field: IField) => any | undefined;

export interface FieldChangeHandlerConfig {
    changeHandler?: FieldService<FieldChangeHandler>;
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
