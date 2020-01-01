import * as React from "react";
import FormRenderer from "../protocol/FormRenderer";
import IForm from "./IForm";
import FieldRenderer from "../protocol/FieldRenderer";
import FormDefault from "./FormDefault";

export default class SimpleFormRenderer implements FormRenderer {

    private form: IForm;
    private fieldRenderer: FieldRenderer;
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