import * as React from "react";
import FieldConfig from "../Field/FieldConfig";
import BaseFieldsRenderer from "../Form/BaseFieldsRenderer";


export default class SimpleFieldRenderer extends BaseFieldsRenderer {

    protected renderFieldElement(config: FieldConfig, inArray: boolean): React.ReactElement {
        const Component: any = config.as;
        const props = {...config, ...this.getInjectedProps()};
        return <Component key={config.name} {...props}/>;
    }

    protected renderWrapper(fields: any): React.ReactElement {
        return <div>{fields}</div>;
    }

}