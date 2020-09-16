import React from "react";
import {FieldProps} from "../Field/FieldProps";
import FileField from "../Field/Concrete/FileField";


interface Props extends FieldProps {
    label?: string
}

export default class DefaultFileField extends FileField<Props> {

    render(): any {

        const wrapperStyle: any = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';

        const disable = this.isDisableOnLoading() && this.isLoading();

        return <div style={wrapperStyle}>
            {
                this.props.label && <label>{this.props.label}</label>
            }
            <input name={this.getName()} type={'file'} multiple={this.props.multiple} disabled={disable}
                   onChange={e => this.handleChange(e)}/>
            {
                !this.isValid() && <b style={{color: 'red'}}>ERROR</b>
            }
            {
                this.getMessage() &&
                <span className={`message_type_${this.getMessageType()}`}>{this.getMessage()}</span>
            }
        </div>
    }

    extractValueFromChangeEvent(event: any): any {
        return event.target.files;
    }

}