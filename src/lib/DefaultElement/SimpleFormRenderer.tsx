import * as React from "react";
import FormRenderer from "../Protocol/FormRenderer";
import IForm from "../Form/IForm";
import FieldRenderer from "../Protocol/FieldRenderer";
import FormDefault from "../Form/FormDefault";

export default class SimpleFormRenderer implements FormRenderer {

    private readonly form: IForm;
    private readonly fieldRenderer: FieldRenderer;

    constructor(form: IForm) {
        this.form = form;
        this.fieldRenderer = FormDefault.getFieldRenderer()(this.form);
    }

    render() {
        return <div>
            {
                this.fieldRenderer.render()
            }
        </div>
    }

    public getForm(): IForm {
        return this.form;
    }
}