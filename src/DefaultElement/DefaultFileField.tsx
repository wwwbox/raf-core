import { DefaultTextField as TextField } from "./DefaultTextField";
import { FieldProps } from "../Field/FieldProps";
import { FieldType } from "../Field/Concrete/FieldType";


interface FileExtraConfiguration {
    label?: string
    multiple?: boolean;
}

export class DefaultFileField extends TextField<FileExtraConfiguration> {

    constructor(props: FieldProps) {
        super(props);
        this.state.value.extractValueFromEvent = event => event.target.files;
    }

    protected getInputComponent(): any {
        return 'input';
    }

    protected getOtherProps(): any {
        return {
            type: 'file',
            multiple: this.extra().config('multiple')
        }
    }

    getType(): FieldType {
        return FieldType.FILE;
    }

}

export default DefaultFileField;