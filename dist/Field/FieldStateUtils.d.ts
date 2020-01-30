import FieldState from "./FieldState";
import { FieldProps } from "./FieldProps";
export default class FieldStateUtils {
    private readonly fieldProps;
    constructor(fieldProps: FieldProps);
    getInitialState(): FieldState;
    static valueOrDefault(initial: any, defaultValue: any): any;
}
