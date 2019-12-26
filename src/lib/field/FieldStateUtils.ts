import FieldProps from "./FieldProps";
import FieldState from "./FieldState";

export default class FieldStateUtils {
    private readonly fieldProps: FieldProps;

    constructor(fieldProps: FieldProps) {
        this.fieldProps = fieldProps;
    }

    public getInitialState(): FieldState {
        return {
            asQuery: FieldStateUtils.valueOrDefault(this.fieldProps.asQuery, false),
            disableOnLoading: FieldStateUtils.valueOrDefault(this.fieldProps.disableOnLoading, false),
            escapeValidation: FieldStateUtils.valueOrDefault(this.fieldProps.escapeValidation, false),
            message: FieldStateUtils.valueOrDefault(this.fieldProps.message, ''),
            messageType: FieldStateUtils.valueOrDefault(this.fieldProps.messageType, undefined),
            readonly: false,
            startingValue: FieldStateUtils.valueOrDefault(this.fieldProps.startingValue, ''),
            validateOnChange: FieldStateUtils.valueOrDefault(this.fieldProps.validateOnChange, true),
            validationRules: FieldStateUtils.valueOrDefault(this.fieldProps.validationRules, undefined),
            value: FieldStateUtils.valueOrDefault(this.fieldProps.startingValue, ''),
            name: this.fieldProps.name,
            isValid: true,
        }
    }

    public static valueOrDefault(initial: any, defaultValue: any): any {
        if (initial === null || initial === undefined) {
            return defaultValue;
        }
        return initial;
    }
}