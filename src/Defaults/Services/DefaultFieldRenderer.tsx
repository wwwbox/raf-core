import * as React from "react";
import FieldRendererBase from "./FieldRendererBase";
import {FieldOptions} from "../../Field/FieldProps";
import IForm from "../../Form/IForm";


export default class DefaultFieldRenderer extends FieldRendererBase {

    constructor(form: IForm) {
        super(form);
    }

    protected renderFieldElement(options: FieldOptions, inArray: boolean): React.ReactElement {
        const Component: any = options.as;
        const props = {...options, ...this.getInjectedProps()};
        return <Component key={options.name} {...props}/>;
    }

    protected renderWrapper(fields: any): React.ReactElement {
        return <div>{fields}</div>;
    }

}