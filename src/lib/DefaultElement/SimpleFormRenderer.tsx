import * as React from "react";
import FormRenderer from "../Protocol/FormRenderer";
import IForm from "../Form/IForm";

export default class SimpleFormRenderer implements FormRenderer {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    render(content: any) {
        return <div>
            {content}
            <button onClick={() => this.getForm().submit()}>SUBMIT</button>
        </div>
    }

    public getForm(): IForm {
        return this.form;
    }
}