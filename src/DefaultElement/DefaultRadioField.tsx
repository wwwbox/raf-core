import { DefaultOptionsFieldBase } from "./DefaultOptionsFieldBase";


export class DefaultRadioField extends DefaultOptionsFieldBase {
    protected getInputComponent(): any {
        return 'div';
    }

    protected getMainProps(): any {
        return {};
    }

    protected renderOption(option: any, index: number): any {
        return <>
            <input disabled={this.ui().shouldDisable()}
                checked={this.value().get() == option.value}
                value={option.value}
                name={this.getName()}
                onChange={this.handleValueChange}
                type={'radio'} />
            {option.label}
        </>
    }


}

export default DefaultRadioField;