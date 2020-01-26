import Field from "../Field/Field";
import React from "react";


export default class TextField extends Field {

    render(): any {

        const wrapperStyle: any = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';

        const disable = this.isDisableOnLoading() && this.isLoading();

        return <div style={wrapperStyle}>
            <textarea name={this.getName()} rows={4} disabled={disable} value={this.getValue()}
                      onChange={e => this.handleChange(e)}/>
            {
                this.getMessage() &&
                <span className={`message_type_${this.getMessageType()}`}>{this.getMessage()}</span>
            }
        </div>
    }

}