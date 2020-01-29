import Field from "./Field";
import { FieldProps } from "./FieldProps";
import FieldState from "./FieldState";
export default class DynamicField<Props extends FieldProps = FieldProps, State extends FieldState = FieldState> extends Field<Props, State> {
    constructor(props: FieldProps);
    addInput: (startingValue?: any) => void;
    removeInput: (index: number) => void;
}
