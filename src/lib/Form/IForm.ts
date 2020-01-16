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

    isLoading(): void;

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