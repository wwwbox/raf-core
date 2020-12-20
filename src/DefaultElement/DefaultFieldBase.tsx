import * as React from "react";
import { Field } from "../Field/Concrete/Field";


export abstract class DefaultFieldBase<ExtraConfiguration = any> extends Field<ExtraConfiguration> {

    render(): any {
        const input = this.renderInput();
        return this.renderWrapper(input);
    }

    protected renderInput() {
        const Input = this.getInputComponent();
        return <Input {...this.getInjectedProps()}>
            {
                this.renderInputChildren()
            }
        </Input>
    }

    protected getInjectedProps(): any {
        return { ...this.getMainProps(), ...this.getOtherProps() };
    }

    protected getMainProps(): any {
        return {
            name: this.getName(),
            disabled: this.ui().shouldDisable(),
            value: this.value().get(),
            onChange: this.handleValueChange,
        }
    }

    protected getOtherProps(): any {
        return {};
    }

    protected renderInputChildren(): any {
        return null;
    }

    protected abstract getInputComponent(): any;

    protected renderWrapper(field: any) {
        const wrapperStyle = this.getWrapperStyle();
        return <div style={wrapperStyle}>
            {
                this.renderPreInput()
            }
            {field}
            {
                this.renderPostInput()
            }
            {this.renderValidationElements()}
            {this.renderMessage()}
        </div>
    }

    protected getWrapperStyle() {
        const wrapperStyle: any = {};
        if (this.ui().isHidden())
            wrapperStyle["display"] = 'none';
        return wrapperStyle;
    }

    protected renderPreInput(): any {
        return null;
    }

    protected renderPostInput(): any {
        return null;
    }

    private renderValidationElements() {
        return <>
            {
                !this.validation().getCurrentValidState() && <b style={{ color: 'red' }}>ERROR</b>
            }
        </>;
    }

    private renderMessage() {
        return <>
            {
                this.ui().getMessage() &&
                <span className={`message_type_${this.ui().getMessageType()}`}>{this.ui().getMessage()}</span>
            }
        </>;
    }
}

export default DefaultFieldBase;