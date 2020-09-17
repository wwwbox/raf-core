import * as React from "react";
import BaseFieldRenderer from "../Defaults/DefaultFieldRenderer";
import {FieldOptions} from "../Field/FieldProps";


export default class SimpleFieldRenderer extends BaseFieldRenderer {

    protected renderFieldElement(options: FieldOptions, inArray: boolean): React.ReactElement {
        const Component: any = options.as;
        const props = {...options, ...this.getInjectedProps()};
        return <Component key={options.name} {...props}/>;
    }

    protected renderWrapper(fields: any): React.ReactElement {
        return <div>{fields}</div>;
    }

}