import Field from "./Field";
import {FieldType} from "./FieldType";

export default class FileField extends Field {

    getType(): FieldType {
        return FieldType.FILE;
    }
}