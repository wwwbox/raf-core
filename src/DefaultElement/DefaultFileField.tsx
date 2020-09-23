import React from "react";
import TextField from "./DefaultTextField";
import {FieldProps} from "../Field/FieldProps";


interface FileExtraConfiguration {
    label?: string
    multiple?: boolean;
}

export default class DefaultFileField extends TextField<FileExtraConfiguration> {

    constructor(props: FieldProps) {
        super(props);
        this.state.value.extractValueFromEvent = event => event.target.files;
    }

    protected getInputComponent(): any {
        return 'input';
    }

    protected getOtherProps(): any {
        return {
            type: 'file',
            multiple: this.extra().config('multiple')
        }
    }


}