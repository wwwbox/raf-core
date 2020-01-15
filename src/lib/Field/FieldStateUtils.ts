import FieldState from "./FieldState";
import {FieldProps} from "./FieldProps";

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
            message: FieldStateUtils.valueOrDefault(this.fieldProps.message, undefined),
            messageType: FieldStateUtils.valueOrDefault(this.fieldProps.messageType, undefined),
            readonly: FieldStateUtils.valueOrDefault(this.fieldProps.readonly, false),
            startingValue: FieldStateUtils.valueOrDefault(this.fieldProps.startingValue, ''),
            validateOnChange: FieldStateUtils.valueOrDefault(this.fieldProps.validateOnChange, true),
            validationRules: FieldStateUtils.valueOrDefault(this.fieldProps.validationRules, undefined),
            value: FieldStateUtils.valueOrDefault(this.fieldProps.startingValue, ''),
            name: this.fieldProps.name!,
            isValid: FieldStateUtils.valueOrDefault(this.fieldProps.isValid, true),
            isReadyToCollect: FieldStateUtils.valueOrDefault(this.fieldProps.isReadyToCollect, true),
            isHidden: FieldStateUtils.valueOrDefault(this.fieldProps.isHidden, false),
        }
    }

    public static valueOrDefault(initial: any, defaultValue: any): any {
        if (initial === null || initial === undefined) {
            return defaultValue;
        }
        return initial;
    }
}