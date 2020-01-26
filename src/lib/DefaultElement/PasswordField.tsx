import Field from "../../lib/Field/Field";
import React from "react";


export default class PasswordField extends Field {

    render(): any {

        const wrapperStyle: any = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';

        const disable = this.isDisableOnLoading() && this.isLoading();

        return <div style={wrapperStyle}>
            {
                this.props.label && <label>{this.props.label}</label>
            }
            <input name={this.getName()} type={'password'} disabled={disable} value={this.getValue()}
                   onChange={e => this.handleChange(e)}/>
            {
                this.getMessage() &&
                <span className={`message_type_${this.getMessageType()}`}>{this.getMessage()}</span>
            }
        </div>
    }

}