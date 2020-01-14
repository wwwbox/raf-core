import {RenderConfig} from "./FormProps";
import IField from "../Field/IField";
import FieldsRenderer from "../Protocol/FieldsRenderer";

export default interface IForm {


    getRenderConfig(): RenderConfig;

    startLoading(): void;

    stopLoading(): void;

    isLoading(): void;

    registerField(field: IField): void;

    getRegisteredFields(): IField[];

    getFieldsRenderer(): FieldsRenderer;

    // collect():any;
    // validate():boolean;
    // submit():void;

    // emitEvent():void;

}