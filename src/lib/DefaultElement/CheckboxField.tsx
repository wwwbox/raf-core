import Field from "../../lib/Field/Field";
import React from "react";


export default class CheckboxField extends Field {

    render(): any {

        const wrapperStyle: any = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';

        const disable = this.isDisableOnLoading() && this.isLoading();
        const label = this.props.label ?? '';

        return <div style={wrapperStyle}>
            <input name={this.getName()} type={'checkbox'} disabled={disable} value={this.getValue()}
                   onChange={e => this.handleChange(e)}/>
            <label>{label}</label>
            {
                this.getMessage() &&
                <span className={`message_type_${this.getMessageType()}`}>{this.getMessage()}</span>
            }
        </div>
    }

    extractValueFromChangeEvent(event: any): any {
        return event.target.checked;
    }

}