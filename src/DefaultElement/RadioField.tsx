import React from "react";
import {DefaultOptionsFieldBase} from "./DefaultOptionsFieldBase";


export default class RadioField extends DefaultOptionsFieldBase {
    protected getInputComponent(): any {
        return 'div';
    }

    protected getDefaultProps(): any {
        return {};
    }

    protected renderOption(option: any, index: number): any {
        return <>
            <input disabled={this.ui().shouldDisable()}
                   checked={this.value().get() === option.value}
                   value={option.value}
                   name={this.getName()}
                   onChange={this.handleValueChange}
                   type={'radio'}/>
            {option.label}
        </>
    }


}