import * as React from "react";
import FieldConfig from "../Field/FieldConfig";
import BaseFieldsRenderer from "../Form/BaseFieldsRenderer";
export default class SimpleFieldRenderer extends BaseFieldsRenderer {
    protected renderFieldElement(config: FieldConfig, inArray: boolean): React.ReactElement;
    protected renderWrapper(fields: any): React.ReactElement;
}
