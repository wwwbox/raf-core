import React from "react";
import DefaultFieldBase from "./DefaultFieldBase";
import {TextFieldExtraConfiguration} from "./DefaultTextField";
import {FieldProps} from "../Field/FieldProps";


export default class DefaultCheckboxField extends DefaultFieldBase<TextFieldExtraConfiguration> {

    constructor(props: FieldProps) {
        super(props);
        this.state.value.extractValueFromEvent = event => event.target.checked;
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

    extractValueFromChangeEvent(event: any): any {
        return;
    }

}