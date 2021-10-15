import * as React from "react";
import {DefaultTextField as TextField} from "./DefaultTextField";
import {FieldProps} from "../Field/FieldProps";
import {FieldType} from "../Field/FieldType";


interface FileExtraConfiguration {
    label?: string
    multiple?: boolean;
}

export class DefaultFileField extends TextField<FileExtraConfiguration> {

    constructor(props: FieldProps) {
        super(props);
        this.state.value.extractValueFromEvent = event => event.target.files;
    }

    getType(): FieldType {
        return FieldType.FILE;
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

export default DefaultFileField;