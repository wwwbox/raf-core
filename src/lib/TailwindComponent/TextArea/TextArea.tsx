import React from "react";
import TextField from "../TextField/TextField";


export default class TextArea extends TextField {

    protected renderInput = () => {
        return <textarea onChange={e => this.handleChange(e)}
                         className={this.inputClassName()}
                         name={this.props.name}
                         disabled={this.isDisabled()}
                         placeholder={this.props.placeholder ?? ''}
                         rows={this.props.rows ?? 5}
                         value={this.state.value}
                         title={this.props.name}
                         {...this.getInjectedProps()}/>;
    };

    protected tailwindFormClassName = () => 'form-input'
}