import * as React from "react";
import FieldRenderer from "../protocol/FieldRenderer";
import IForm from "./IForm";
import FieldConfig from "../field/FieldConfig";


export default class SimpleFieldRenderer implements FieldRenderer{

    private form : IForm;

    constructor(form : IForm){
        this.form = form;
    }

    public render():any{
        const config : FieldConfig[] = this.form.getFieldsConfig();
        return <div />
    }

    public getForm():IForm{
        return this.form;
    }
}