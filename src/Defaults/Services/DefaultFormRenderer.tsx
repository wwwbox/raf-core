import {FormRenderer} from "../../Protocol/FormRenderer";
import {IForm} from "../../Form/IForm";
import * as React from "react";
import {RafDefaults} from "../RafDefaults";
import {FieldRenderer} from "../../Protocol/FieldRenderer";

export class DefaultFormRenderer implements FormRenderer {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    getForm(): IForm {
        return this.form;
    }

    render(): any {
        const fields = this.renderFields();
        return <div className={'__raf'}>
            {fields}
            <br/>
            {
                this.renderButton()
            }
        </div>
    }

    protected renderFields(): any {
        const fieldRenderer = this.form.getServiceProvider().getService<FieldRenderer>("fieldRenderer");
        return fieldRenderer.render();
    }

    private renderButton(): any {
        let renderOptions = this.getForm().getProps().extra?.renderOptions ?? {};
        renderOptions = {...RafDefaults.form.renderOptions, ...renderOptions};
        const text = renderOptions.buttonText;
        return <button onClick={() => this.getForm().submit()}>{text}</button>;
    }

}

