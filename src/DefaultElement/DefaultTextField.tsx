import { DefaultFieldBase } from "./DefaultFieldBase";


export interface TextFieldExtraConfiguration {
    label?: string;
}

export class DefaultTextField<ExtraConfiguration extends TextFieldExtraConfiguration = TextFieldExtraConfiguration> extends DefaultFieldBase<ExtraConfiguration> {


    protected getInputComponent(): any {
        return 'input';
    }

    protected getOtherProps(): any {
        return {
            type: 'text'
        }
    }

    protected renderPreInput(): any {
        const label = this.extra().config('label');
        return label ? <label>{label}</label> : null;
    }

}

export default DefaultTextField;