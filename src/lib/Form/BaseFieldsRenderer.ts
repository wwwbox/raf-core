import FieldRenderer from "../Protocol/FieldRenderer";
import IForm from "./IForm";
import FieldConfig from "../Field/FieldConfig";
import React from "react";


export default abstract class BaseFieldsRenderer implements FieldRenderer {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    public render(): any {
        const config: FieldConfig[] = this.form.getFieldsConfig();
        const fields = config.map(this.renderField);
        return this.renderWrapper(fields);
    }

    private renderField(config: FieldConfig | FieldConfig[]): any {
        if (Array.isArray(config)) {
            return config.map(config => this.renderFieldElement(config, true))
        } else {
            return this.renderFieldElement(config, false);
        }
    }

    protected abstract renderFieldElement(config: FieldConfig, inArray: boolean): React.ReactElement;

    protected abstract renderWrapper(fields: any): React.ReactElement;

    public getForm(): IForm {
        return this.form;
    }
}