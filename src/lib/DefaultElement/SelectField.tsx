import Field from "../Field/Field";
import React from "react";


export default class SelectField extends Field {

    render(): any {

        const wrapperStyle: any = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';

        const disable = this.isDisableOnLoading() && this.isLoading();
        const options = this.props.options ?? [];

        return <div style={wrapperStyle}>
            <select name={this.getName()} disabled={disable} value={this.getValue()}
                    onChange={e => this.handleChange(e)}>
                {
                    options.map((option: any, index: number) =>
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>)
                }
            </select>
            {
                this.getMessage() &&
                <span className={`message_type_${this.getMessageType()}`}>{this.getMessage()}</span>
            }
        </div>
    }

}