import TextField from "../TextField/TextField";
import React from "react";
import {classNameBuilder} from "../Utils";

export default class RadioField extends TextField {
    public renderInput = () => {
        return <>
            {
                this.props.options.map((option: any, index: number) => {
                        const item = {
                            value: typeof option === "string" ? option : option.value,
                            text: typeof option === "string" ? option : option.text
                        };
                        return <div className={this.optionWrapperClassName()} key={index}>
                            <input
                                onChange={e => this.handleChange(e)}
                                className={this.inputClassName()}
                                name={this.props.name}
                                value={item.value}
                                disabled={this.isDisabled()}
                                placeholder={this.props.placeholder ?? ''}
                                title={this.props.name}
                                type={'radio'}
                                {...this.getInjectedProps()}/>
                            <label className={this.labelClassName()}>{item.text}</label>
                        </div>

                    }
                )
            }
        </>;
    };

    protected optionWrapperClassName = () => {
        let className = !this.props.skipDefaultOptionWrapperClassName ? 'flex items-center p-1' : '';

        if (this.props.optionWrapperClassName)
            className = classNameBuilder(className, this.props.optionWrapperClassName);

        return className;
    };

    public renderLabel = () => null;

    public inputClassName = () => {
        let className = !this.props.skipDefaultInputClassName ? this.tailwindFormClassName() : '';
        if (this.props.inputClassName)
            className = classNameBuilder(className, this.props.inputClassName);
        return className;
    };

    public tailwindFormClassName = () => 'form-radio h-6 w-6';

}