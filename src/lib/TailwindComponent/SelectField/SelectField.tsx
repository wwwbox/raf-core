import TextField from "../TextField/TextField";
import React from "react";

export default class SelectField extends TextField {

    public renderInput = () => {
        return <select className={this.inputClassName()}
                       onChange={e => this.handleChange(e)}
                       value={this.getValue()}
                       disabled={this.isDisabled()}
                       name={this.props.name}
                       title={this.props.name}
                       placeholder={this.props.placeholder ?? ''}
                       {...this.getInjectedProps()}>
            {
                this.props.noSelectOption !== false && <option value={''}>{this.props.noSelectOption ?? ''}</option>
            }
            {
                this.props.options.map((option: any, index: number) => {
                    if (typeof option === "string") {
                        return <option key={index} value={option}>{option}</option>
                    }
                    return <option key={index} value={option.value}>{option.text}</option>
                })
            }
        </select>
    };

    protected tailwindFormClassName = () => 'form-select';

}