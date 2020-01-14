import {RenderConfig} from "./FormProps";
import IField from "../Field/IField";
import FieldsRenderer from "../Protocol/FieldsRenderer";
import CollectedData from "../Utils/CollectedData";

export default interface IForm {


    getRenderConfig(): RenderConfig;

    startLoading(): void;

    stopLoading(): void;

    isLoading(): void;

    registerField(field: IField): void;

    getRegisteredFields(): IField[];

    getRegisteredField(name: string): IField | undefined;

    getFieldsRenderer(): FieldsRenderer;

    collect(): CollectedData;

    attach(key: string, value: any): void;

    deAttach(key: string): void;

    attachFile(key: string, file: File): void;

    deAttachFile(key: string): void;

    // validate():boolean;
    // submit():void;

    // emitEvent():void;

}