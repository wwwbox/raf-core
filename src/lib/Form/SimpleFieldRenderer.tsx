import * as React from "react";
import FieldConfig from "../Field/FieldConfig";
import BaseFieldsRenderer from "./BaseFieldsRenderer";


export default class SimpleFieldRenderer extends BaseFieldsRenderer {

    protected renderFieldElement(config: FieldConfig, inArray: boolean): React.ReactElement {
        const Component: any = config.as;
        return <Component key={config.name} form={this.getForm()} {...config}/>;
    }

    protected renderWrapper(fields: any): React.ReactElement {
        return <div>
            {
                fields
            }
        </div>;
    }

}