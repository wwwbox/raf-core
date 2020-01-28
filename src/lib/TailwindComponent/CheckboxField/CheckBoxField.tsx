import TextField from "../TextField/TextField";
import React from "react";
import BaseTailwindField from "../BaseTailwindField";

export default class CheckBoxField extends TextField {

    static defaultProps = {
        ...BaseTailwindField.defaultProps,
        horizontalLayout: true,
        labelAction: true,
    };

    protected renderWrapper = () => {
        return <div className={this.wrapperClassName()}>
            {
                this.renderInput()
            }
            {
                this.renderLabel()
            }
            {
                this.renderMessage()
            }
        </div>
    };

    renderInput = () => {
        return <input onChange={e => this.handleChange(e)}
                      className={this.inputClassName()}
                      name={this.props.name}
                      disabled={this.isDisabled()}
                      placeholder={this.props.placeholder ?? ''}
                      title={this.props.name}
                      value={this.state.value}
                      type={'checkbox'}
                      checked={this.state.value}
                      {...this.getInjectedProps()}/>;
    };

    protected renderLabel = () => {
        if (this.props.label) {
            const onClick = this.props.labelAction ? () => {
                this.setValue(!this.getValue());
            } : undefined;
            return <label onClick={onClick} className={this.labelClassName()}>{this.props.label}</label>
        }
        return null;
    };

    extractValueFromChangeEvent(event: any): any {
        return event.target.checked;
    }


    tailwindFormClassName = () => 'form-checkbox h-6 w-6';
}