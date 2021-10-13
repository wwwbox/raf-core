import {FieldRenderer} from "../../Protocol/FieldRenderer";
import {IForm} from "../../Form/IForm";
import {FieldInjectedProps, FieldOptions} from "../../Field/FieldProps";
import * as React from "react";


export abstract class FieldRendererBase implements FieldRenderer {

    private readonly form: IForm;

    protected constructor(form: IForm) {
        this.form = form;
    }

    public render(): any {
        const options: (FieldOptions | FieldOptions[])[] = this.form.fieldsManager().getFieldsOptions() ?? [];
        const fields = options.map(this.renderField);
        return this.renderWrapper(fields);
    }

    public getForm(): IForm {
        return this.form;
    }

    protected renderArray(index: number, config: FieldOptions[]): any {
        const ArrayWrapper = this.arrayWrapper();
        return <ArrayWrapper key={index} {...this.arrayWrapperProps()}>
            {
                config.map(config => this.renderFieldElement(config, true))
            }
        </ArrayWrapper>;
    }

    protected arrayWrapper = (): any => 'div';

    protected arrayWrapperProps = (): object => ({className: '__raf-sub-fields'});

    protected abstract renderFieldElement(options: FieldOptions, inArray: boolean): React.ReactElement;

    protected abstract renderWrapper(fields: any): React.ReactElement;

    protected getInjectedProps = (): FieldInjectedProps => {
        const validator = this.getForm().validator().getValidator();
        return {
            injectedValidator: validator,
            form: this.getForm(),
            injectedEventNameMaker: this.getForm().eventService().getNameMaker()
        };
    };

    private renderField = (config: FieldOptions | FieldOptions[], index: number): any => {
        if (Array.isArray(config)) {
            return this.renderArray(index, config)
        } else {
            return this.renderFieldElement(config, false);
        }
    };
}

export default FieldRendererBase;