import React from "react";
import BaseTailwindField, {BaseTailwindFieldProps} from "../BaseTailwindField";

interface Props extends BaseTailwindFieldProps {
}

export default class TextField extends BaseTailwindField<Props> {
    render(): any {
        return this.renderWrapper();
    }

    protected renderWrapper = () => {
        return <div className={this.wrapperClassName()}>
            {
                this.renderLabel()
            }
            {
                this.renderInput()
            }
            {
                this.renderMessage()
            }
        </div>
    };

    protected renderLabel = () => {
        if (this.props.label) {
            return <label className={this.labelClassName()}>{this.props.label}</label>
        }
        return null;
    };

    protected renderInput = () => {
        return <input onChange={e => this.handleChange(e)}
                      className={this.inputClassName()}
                      name={this.props.name}
                      disabled={this.isDisabled()}
                      placeholder={this.props.placeholder ?? ''}
                      title={this.props.name}
                      value={this.state.value}
                      type={'text'}
                      {...this.getInjectedProps()}/>;
    };

    protected renderMessage = () => {
        if (this.getMessage())
            return <p className={this.messageClassName()}>{this.getMessage()}</p>;
        return null;
    };

    protected tailwindFormClassName = () => 'form-input'

}