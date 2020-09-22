import React from "react";
import {DefaultOptionsFieldBase} from "./DefaultOptionsFieldBase";

export interface SelectExtraConfiguration {
    options: any[]
}

export default class SelectField extends DefaultOptionsFieldBase {
    
    protected getInputComponent(): any {
        return 'select';
    }

    protected renderOption(option: any, index: number): any {
        return <option key={index} value={option.value}>
            {option.label}
        </option>;
    }

}