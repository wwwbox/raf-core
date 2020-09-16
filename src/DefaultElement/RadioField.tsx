import Field from "../Field/Concrete/Field";
import React from "react";


export default class RadioField extends Field {

    render(): any {

        const wrapperStyle: any = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';

        const disable = this.isDisableOnLoading() && this.isLoading();
        const options = this.props.options ?? [];

        return <div style={wrapperStyle}>
            <div>
                {
                    options.map((option: any, index: number) =>
                        <React.Fragment key={index}>
                            <input disabled={disable} checked={this.getValue() === option.value}
                                   value={option.value} name={this.getName()}
                                   onChange={e => this.handleChange(e)} type={'radio'}/>
                            {option.label}
                        </React.Fragment>)
                }
            </div>
            {
                this.getMessage() &&
                <span className={`message_type_${this.getMessageType()}`}>{this.getMessage()}</span>
            }
        </div>
    }

}