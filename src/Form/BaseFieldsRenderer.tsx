import FieldsRenderer from "../Protocol/FieldsRenderer";
import IForm from "./IForm";
import FieldConfig from "../Field/FieldConfig";
import React from "react";
import {RenderConfig} from "./FormProps";


export default abstract class BaseFieldsRenderer implements FieldsRenderer {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    public render(): any {
        const config: RenderConfig = this.form.getRenderConfig();
        const fields = config.map(this.renderField);
        return this.renderWrapper(fields);
    }

    private renderField = (config: FieldConfig | FieldConfig[], index: number): any => {
        if (Array.isArray(config)) {
            const ArrayWrapper = this.arrayWrapper();
            return <ArrayWrapper key={index} {...this.arrayWrapperProps()}>
                {
                    config.map(config => this.renderFieldElement(config, true))
                }
            </ArrayWrapper>
        } else {
            return this.renderFieldElement(config, false);
        }
    };

    protected arrayWrapper = (): any => React.Fragment;

    protected arrayWrapperProps = (): object => ({});

    protected abstract renderFieldElement(config: FieldConfig, inArray: boolean): React.ReactElement;

    protected abstract renderWrapper(fields: any): React.ReactElement;

    protected getInjectedProps = (): any => {
        const validator = this.getForm().getValidator();
        return {defaultValidator: validator ? validator : undefined, form: this.getForm()};
    };

    public getForm(): IForm {
        return this.form;
    }
}