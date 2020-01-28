import Field from "./Field";
import DefaultDynamicFieldChangeHandler from "../ChangeHandler/DefaultDynamicFieldChangeHandler";
import {FieldProps} from "./FieldProps";
import FieldState from "./FieldState";

export default class DynamicField<Props extends FieldProps = FieldProps, State extends FieldState = FieldState> extends Field<Props, State> {
    constructor(props: Props) {
        super(props);
        const startingValue = props.startingValue ? (
            Array.isArray(props.startingValue) ? [...props.startingValue] : [props.startingValue]
        ) : [''];

        this.state = {...this.state, value: startingValue};
        this.changeHandler = props.changeHandler ? props.changeHandler(this) : new DefaultDynamicFieldChangeHandler(this);
    }

    public addInput = (startingValue: any = '') => {
        const value = [...this.getValue()];
        if (this.getProps().maxInputs <= value.length) {
            this.getProps().onMaxInputExceeded && this.getProps().onMaxInputExceeded(this);
            return;
        }

        value.push(startingValue);
        this.setValue(value);
    };

    public removeInput = (index: number) => {
        const value = [...this.getValue()];
        value.splice(index, 1);
        this.setValue(value);
    }
}