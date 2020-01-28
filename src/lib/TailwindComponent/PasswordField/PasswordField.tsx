import React from "react";
import {BaseTailwindFieldProps} from "../BaseTailwindField";
import TextField from "../TextField/TextField";

interface Props extends BaseTailwindFieldProps {
}

export default class PasswordField extends TextField {
    protected renderInput = () => {
        return <input onChange={e => this.handleChange(e)}
                      className={this.inputClassName()}
                      name={this.props.name}
                      disabled={this.isDisabled()}
                      placeholder={this.props.placeholder ?? ''}
                      title={this.props.name}
                      value={this.state.value}
                      type={'password'}
                      {...this.getInjectedProps()}/>;
    };
}