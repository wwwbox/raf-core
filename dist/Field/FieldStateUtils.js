var FieldStateUtils = /** @class */ (function () {
    function FieldStateUtils(fieldProps) {
        this.fieldProps = fieldProps;
    }
    FieldStateUtils.prototype.getInitialState = function () {
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
            name: this.fieldProps.name,
            isValid: FieldStateUtils.valueOrDefault(this.fieldProps.isValid, true),
            isReadyToCollect: FieldStateUtils.valueOrDefault(this.fieldProps.isReadyToCollect, true),
            isHidden: FieldStateUtils.valueOrDefault(this.fieldProps.isHidden, false),
            shouldCollect: FieldStateUtils.valueOrDefault(this.fieldProps.shouldCollect, true),
            shouldValidate: FieldStateUtils.valueOrDefault(this.fieldProps.shouldValidate, true)
        };
    };
    FieldStateUtils.valueOrDefault = function (initial, defaultValue) {
        if (initial === null || initial === undefined) {
            return defaultValue;
        }
        return initial;
    };
    return FieldStateUtils;
}());
export default FieldStateUtils;
