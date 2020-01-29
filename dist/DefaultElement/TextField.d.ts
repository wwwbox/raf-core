import Field from "../Field/Field";
import { FieldProps } from "../Field/FieldProps";
interface Props extends FieldProps {
    label?: string;
}
export default class TextField extends Field<Props> {
    render(): any;
}
export {};
