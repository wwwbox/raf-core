import * as React from "react";
import { DefaultOptionsFieldBase } from "./DefaultOptionsFieldBase";


export class DefaultSelectField extends DefaultOptionsFieldBase {

    protected getInputComponent(): any {
        return 'select';
    }

    protected renderOption(option: any, index: number): any {
        return <option key={index} value={option.value}>
            {option.label}
        </option>;
    }

}

export default DefaultSelectField;