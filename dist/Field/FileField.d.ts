import Field from "./Field";
import FieldState from "./FieldState";
import { FieldProps } from "./FieldProps";
export default class FileField<Props extends FieldProps = FieldProps, State extends FieldState = FieldState> extends Field<Props, State> {
    isFileField(): boolean;
}
