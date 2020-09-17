import FieldRenderer from "../Protocol/FieldRenderer";
import IForm from "../Form/IForm";
import {FieldInjectedProps, FieldOptions} from "../Field/FieldProps";
import * as React from "react";


export default abstract class BaseFieldRenderer implements FieldRenderer {

    private readonly form: IForm;

    protected constructor(form: IForm) {
        this.form = form;
    }

    public render(): any {
        const options: (FieldOptions | FieldOptions[])[] = this.form.fields().getFieldsOptions();
        const fields = options.map(this.renderField);
        return this.renderWrapper(fields);
    }

    private renderField = (config: FieldOptions | FieldOptions[], index: number): any => {
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

    protected abstract renderFieldElement(options: FieldOptions, inArray: boolean): React.ReactElement;

    protected abstract renderWrapper(fields: any): React.ReactElement;

    protected getInjectedProps = (): FieldInjectedProps => {
        const validator = this.getForm().validation().getValidator();
        return {
            injectedValidator: validator,
            form: this.getForm(),
            injectedEventNameMaker: this.getForm().event().getNameMaker()
        };
    };

    public getForm(): IForm {
        return this.form;
    }
}