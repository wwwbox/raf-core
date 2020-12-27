import * as React from "react";
import {DefaultFieldBase} from "./DefaultFieldBase";
import {TextFieldExtraConfiguration} from "./DefaultTextField";
import {FieldProps} from "../Field/FieldProps";


export class DefaultCheckboxField extends DefaultFieldBase<TextFieldExtraConfiguration> {

    constructor(props: FieldProps) {
        super(props);
        this.state.value.extractValueFromEvent = event => event.target.checked;
    }

    extractValueFromChangeEvent(event: any): any {
        return;
    }

    protected getInputComponent(): any {
        return 'input';
    }

    protected getOtherProps(): any {
        return {
            type: 'checkbox'
        }
    }

    protected renderPostInput(): any {
        const label = this.extra().config('label') ?? '';
        return <label>{label}</label>
    }

}

export default DefaultCheckboxField;