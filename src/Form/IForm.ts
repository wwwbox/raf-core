import {RenderConfig} from "./FormProps";
import IField from "../Field/IField";
import FieldsRenderer from "../Protocol/FieldsRenderer";
import CollectedData from "../Utils/CollectedData";
import Validator from "../Protocol/Validator";
import AutoFormEvent from "./AutoFormEvent";

export default interface IForm {

    getRenderConfig(): RenderConfig;

    startLoading(): void;

    stopLoading(): void;

    isLoading(): boolean;

    registerField(field: IField): void;

    getRegisteredFields(): IField[];

    getRegisteredField(name: string): IField | undefined;

    getFieldsRenderer(): FieldsRenderer;

    getValidator(): Validator | null;

    collect(): CollectedData;

    isReadyToCollect(): boolean;

    attach(key: string, value: any): void;

    deAttach(key: string): void;

    attachFile(key: string, file: File): void;

    deAttachFile(key: string): void;

    validate(): boolean;

    submit(): void;

    emitEvent(event: AutoFormEvent): void;

    onAnyValueChanged(key: string, value: string, field: IField): void;

    reset(): void;

    clear(): void;

    setValues(values: any): void;
}

export interface IFormProgressState {

    isLoading(): boolean;

    isReadyToSubmit(): boolean;

    isReadyToCollection(): boolean;

    startLoading(): void;

    stopLoading(): void;

    complete(): void;

    fail(): void;
}

export interface IFormValue {

    set(values: any): void;

    collect(): any;

    attach(): void;

    detach(): void;

    attachFile(): void;

    detachFile(): void;

    clear(): void;

    reset(): void;

}

export interface IFromValidation {

    getValidator(): Validator | null;

    validate(): boolean;

    validateWithEffect(): boolean;

}

export interface IFormEvent {

    emitEvent(event: AutoFormEvent): void;

    emitValueChangedEvent(key: string, value: string, field: IField): void;

    listen(event: string, callback: (event: AutoFormEvent) => void): void;

}