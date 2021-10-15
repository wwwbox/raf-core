import {Field} from "./Field";
import {FieldType} from "./FieldType";
import {FieldProps} from "./FieldProps";

export class FileField extends Field {

    constructor(props: FieldProps) {
        super(props);
        this.state.value.extractValueFromEvent = this.state.value.extractValueFromEvent ?? (e => e.target.files);
    }

    getType(): FieldType {
        return FieldType.FILE;
    }
}


export default FileField;