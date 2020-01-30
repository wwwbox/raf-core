
import Field from "../Field/Field";
import React from "react";
import {FieldProps} from "../Field/FieldProps";


interface Props extends FieldProps {
    label?: string
}

export default class TextField extends Field<Props> {

    render(): any {

        const wrapperStyle: any = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';

        const disable = this.isDisableOnLoading() && this.isLoading();

        return <div style={wrapperStyle}>
            {
                this.props.label && <label>{this.props.label}</label>
            }
            <input name={this.getName()} type={'text'} disabled={disable} value={this.getValue()}
                   onChange={e => this.handleChange(e)}/>
            {
                !this.isValid() && <b style={{color: 'red'}}>ERROR</b>
            }
            {
                this.getMessage() &&
                <span className={`message_type_${this.getMessageType()}`}>{this.getMessage()}</span>
            }
        </div>
    }

}