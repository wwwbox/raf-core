import * as React from "react";
import FieldRendererBase from "./FieldRendererBase";
import {FieldOptions} from "../../Field/FieldProps";
import IForm from "../../Form/IForm";


export default class DefaultFieldRenderer extends FieldRendererBase {

    constructor(form: IForm) {
        super(form);
    }

    protected renderFieldElement(options: FieldOptions, inArray: boolean): React.ReactElement {
        const {as: Component, ...otherOptions} = options;
        const props = {...otherOptions, ...this.getInjectedProps()};
        return <div className={'__raf-field'} key={options.name}>
            <Component {...props}/>
        </div>;
    }

    protected renderWrapper(fields: any): React.ReactElement {
        return <div className={'__raf-fields-wrapper'}>{fields}</div>;
    }

}