import BaseFieldsRenderer from "./../../Form/BaseFieldsRenderer";
import FieldConfig from "./../../Field/FieldConfig";
import * as React from "react";


export default class TailwindFieldsRenderer extends BaseFieldsRenderer {
    protected renderFieldElement(config: FieldConfig, inArray: boolean): React.ReactElement {
        const Component: any = config.as;
        const props = {...config, ...this.getInjectedProps(), inArray: inArray};
        return <Component key={config.name} {...props}/>;
    }

    protected renderWrapper(fields: any): React.ReactElement {
        return <div className={'af-tailwind-fields-wrapper'}>
            {fields}
        </div>;
    }

    arrayWrapper = (): any => 'div';

    arrayWrapperProps = (): any => ({className: 'flex flex-row'});
}