import React from "react";
import DynamicField from "../../Field/DynamicField";
import {FieldProps} from "../../Field/FieldProps";
import {classNameBuilder} from "../Utils";

interface Props extends FieldProps {
    renderPlusButtonAt?: "lastInput" | "top" | "bottom",
    plusButtonText?: string | ((field: DynamicTextField) => any);
    customPlusButton?: (field: DynamicTextField) => any;

    removeButton?: boolean;
    removeButtonText?: string | ((field: DynamicTextField) => any);
    customRemoveButton?: (field: DynamicTextField, index: number) => any;

    newInputStartingValue?: string | ((field: DynamicTextField) => string);
    renderLabel?: (index: number, field: DynamicTextField, value: any) => any;

    wrapperClassName?: string;
    inputClassName?: string;
    inputWrapperClassName?: string;

}

export default class DynamicTextField extends DynamicField<Props> {

    static defaultProps = {
        renderPlusButtonAt: "bottom",
        plusButtonText: "+",
        removeButtonText: "-",
    };

    render(): any {
        return <div className={this.wrapperClassName()}>
            {
                this.props.renderPlusButtonAt === "top" && this.renderPlusButton()
            }
            {
                this.renderInputs()
            }
            {
                this.props.renderPlusButtonAt === "bottom" && this.renderPlusButton()
            }
        </div>
    }

    private renderInputs = () => {
        return this.state.value.map((value: any, index: number) => {
            return <div key={index} className={this.inputWrapperClassName()}>

                {
                    this.renderLabel(index, value)
                }

                <input onChange={e => this.handleChange({...e, index: index})}
                       className={this.inputClassName()}
                       name={this.props.name + "_" + index}
                       disabled={this.isDisabled()}
                       placeholder={this.props.placeholder ?? ''}
                       title={this.props.name}
                       value={value}
                       type={'text'}
                       {...this.getInjectedProps()}/>

                {
                    this.renderRemoveButton(index)
                }

                {
                    (this.props.renderPlusButtonAt === "lastInput" && index + 1 === this.state.value.length) &&
                    this.renderPlusButton()
                }

            </div>
        });
    };

    public getInjectedProps = () => this.props.inputProps ?? {};

    protected wrapperClassName = () => {
        let className = !this.props.skipDefaultWrapperClassName ? 'flex flex-col flex-1 p-1' : '';
        if (this.props.wrapperClassName)
            className = classNameBuilder(className, this.props.wrapperClassName!);
        return className;
    };

    protected inputClassName = () => {
        let className = !this.props.skipDefaultInputClassName ? 'border p-2 rounded form-input' : '';
        if (this.getProps().fullInputWidth) {
            className = classNameBuilder(className, 'w-full');
        }
        if (this.props.inputClassName)
            className = classNameBuilder(className, this.props.inputClassName!);

        if (!this.isValid()) {
            className = classNameBuilder(className, `bg-red-500 text-red-200 ${this.props.errorClassName ?? ''}`);
        }

        return className;
    };

    protected inputWrapperClassName = () => {
        let className = !this.props.skipDefaultInputWrapperClassName ? 'flex flex-1 p-1' : '';
        if (this.props.inputWrapperClassName)
            className = classNameBuilder(className, this.props.inputWrapperClassName!);
        return className;
    };

    protected renderPlusButton = () => {
        if (this.props.customPlusButton)
            return this.props.customPlusButton(this);

        return <div>
            <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
                    onClick={() => {
                        let startingValue = '';
                        if (typeof this.props.newInputStartingValue === "string")
                            startingValue = this.props.newInputStartingValue;
                        else if (typeof this.props.newInputStartingValue === "function")
                            startingValue = this.props.newInputStartingValue(this);
                        this.addInput(startingValue);
                    }}>
                {this.getInner(this.props.plusButtonText!)}
            </button>
        </div>
    };

    protected renderRemoveButton = (index: number) => {
        if (this.props.customRemoveButton)
            return this.props.customRemoveButton(this, index);
        if (this.props.removeButton) {
            return <div>
                <button className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'}
                        onClick={() => this.removeInput(index)}>
                    {
                        this.getInner(this.props.removeButtonText!)
                    }
                </button>
            </div>
        }
        return null;
    };

    private getInner = (value: string | ((field: DynamicTextField) => string)) => {
        if (typeof value === "string")
            return value;
        else if (typeof value === "function")
            return value(this);
        return null;
    };

    protected renderLabel = (index: number, value: any) => {
        if (this.props.renderLabel) {
            return this.props.renderLabel(index, this, value);
        }
        return null;
    }

}