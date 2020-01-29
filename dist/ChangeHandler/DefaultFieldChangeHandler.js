var DefaultFieldChangeHandler = /** @class */ (function () {
    function DefaultFieldChangeHandler(field) {
        var _this = this;
        this.shouldCancelChange = function () {
            return _this.getField().isReadonly() || (_this.getField().isDisableOnLoading() && _this.getField().isLoading());
        };
        this.getValue = function (event) {
            return _this.getField().extractValueFromChangeEvent(event);
        };
        this.changeValue = function (event, value) {
            var validateOnChange = _this.getField().isValidateOnChange() && _this.getField().shouldValidate();
            _this.getField().setValue(value, validateOnChange, function () {
                _this.getField().getProps().afterChange && _this.getField().getProps().afterChange(event, value, _this.getField());
            });
        };
        this.notify = function (value) {
            _this.getField().getForm().onAnyValueChanged(_this.getField().getName(), value, _this.getField());
        };
        this.field = field;
    }
    DefaultFieldChangeHandler.prototype.getField = function () {
        return this.field;
    };
    DefaultFieldChangeHandler.prototype.handle = function (event) {
        if (this.shouldCancelChange()) {
            return;
        }
        if (this.getField().getProps().onChange) {
            this.getField().getProps().onChange(event, this.getField());
            return;
        }
        var value = this.getValue(event);
        this.changeValue(event, value);
        this.notify(value);
    };
    return DefaultFieldChangeHandler;
}());
export default DefaultFieldChangeHandler;
