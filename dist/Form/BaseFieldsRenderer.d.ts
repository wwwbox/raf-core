import FieldsRenderer from "./../Protocol/FieldsRenderer";
import IForm from "./IForm";
import FieldConfig from "./../Field/FieldConfig";
import React from "react";
export default abstract class BaseFieldsRenderer implements FieldsRenderer {
    private readonly form;
    constructor(form: IForm);
    render(): any;
    private renderField;
    protected arrayWrapper: () => any;
    protected arrayWrapperProps: () => object;
    protected abstract renderFieldElement(config: FieldConfig, inArray: boolean): React.ReactElement;
    protected abstract renderWrapper(fields: any): React.ReactElement;
    protected getInjectedProps: () => any;
    getForm(): IForm;
}
