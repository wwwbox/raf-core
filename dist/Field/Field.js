var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import FieldStateUtils from "./FieldStateUtils";
import DefaultFieldChangeHandler from "../ChangeHandler/DefaultFieldChangeHandler";
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field(props) {
        var _this = _super.call(this, props) || this;
        _this.isValidateOnChange = function () {
            return _this.state.validateOnChange;
        };
        _this.getForm = function () {
            return _this.props.form;
        };
        _this.getListeners = function () {
            return _this.props.on ? _this.props.on : {};
        };
        _this.isReadyToCollect = function () {
            return _this.state.isReadyToCollect;
        };
        _this.setReadyToCollect = function (ready) {
            _this.setState({ isReadyToCollect: ready });
        };
        _this.setHidden = function (hidden) {
            _this.setState({ isHidden: hidden });
        };
        _this.isHidden = function () {
            return _this.state.isHidden;
        };
        _this.isLoading = function () {
            return _this.props.loading ? _this.props.loading : false;
        };
        _this.getProps = function () {
            return _this.props;
        };
        _this.reset = function () {
            var startingValue = _this.props.startingValue ? _this.props.startingValue : '';
            _this.setValue(startingValue);
        };
        _this.setShouldCollect = function (shouldCollect) {
            _this.setState({ shouldCollect: shouldCollect });
        };
        _this.shouldValidate = function () {
            return _this.state.shouldValidate;
        };
        _this.setShouldValidate = function (shouldValidate) {
            _this.setState({ shouldValidate: shouldValidate });
        };
        _this.state = new FieldStateUtils(props).getInitialState();
        _this.validator = props.validator ? props.validator(_this) : props.defaultValidator;
        _this.changeHandler = props.changeHandler ? props.changeHandler(_this) : new DefaultFieldChangeHandler(_this);
        props.form.registerField(_this);
        return _this;
    }
    Field.prototype.render = function () {
        return null;
    };
    Field.prototype.clear = function () {
        this.setState({ value: '' });
    };
    Field.prototype.getMessage = function () {
        return this.state.message;
    };
    Field.prototype.getMessageType = function () {
        return this.state.messageType;
    };
    Field.prototype.getState = function () {
        return this.state;
    };
    Field.prototype.getValidationRules = function () {
        return this.state.validationRules;
    };
    Field.prototype.getValue = function () {
        return this.state.value;
    };
    Field.prototype.getName = function () {
        return this.state.name;
    };
    Field.prototype.isAsQuery = function () {
        return this.state.asQuery;
    };
    Field.prototype.isDisableOnLoading = function () {
        return this.state.disableOnLoading;
    };
    Field.prototype.isEscapeValidation = function () {
        return this.state.escapeValidation;
    };
    Field.prototype.isReadonly = function () {
        return this.state.readonly;
    };
    Field.prototype.isValid = function () {
        return this.state.isValid;
    };
    Field.prototype.setAsQuery = function (asQuery) {
        this.setState({ asQuery: asQuery });
    };
    Field.prototype.setDisableOnLoading = function (disableOnLoading) {
        this.setState({ disableOnLoading: disableOnLoading });
    };
    Field.prototype.setEscapeValidation = function (escapeValidation) {
        this.setState({ escapeValidation: escapeValidation });
    };
    Field.prototype.setMessage = function (message) {
        this.setState({ message: message });
    };
    Field.prototype.setMessageType = function (type) {
        this.setState({ messageType: type });
    };
    Field.prototype.setReadonly = function (readonly) {
        this.setState({ readonly: readonly });
    };
    Field.prototype.setValue = function (value, validateAfterChange, afterChange) {
        var _this = this;
        if (validateAfterChange === void 0) { validateAfterChange = false; }
        this.setState({ value: value }, function () {
            if (validateAfterChange) {
                _this.validate();
            }
            afterChange && afterChange();
        });
    };
    Field.prototype.setValidateOnChange = function (validateOnChange) {
        this.setState({ validateOnChange: validateOnChange });
    };
    Field.prototype.setValidationRules = function (rules) {
        this.setState({ validationRules: rules });
    };
    Field.prototype.validate = function () {
        var _this = this;
        if (!this.shouldValidate())
            throw Error("THIS FIELD SHOULD NOT BE VALIDATED");
        if (!this.validator)
            throw Error("NO VALIDATOR FOUND");
        var value = this.getValue();
        var rules = this.getValidationRules();
        var isValid = this.validator.validate(value, rules);
        var valid = isValid === true || isValid === '';
        this.setState({ isValid: valid }, function () {
            _this.props.onValidation && _this.props.onValidation(isValid, _this);
        });
        return valid;
    };
    Field.prototype.error = function (error) {
        if (error === void 0) { error = true; }
        this.setState({ isValid: !error });
    };
    Field.prototype.changeState = function (newState) {
        this.setState(newState);
    };
    Field.prototype.handleChange = function (e) {
        this.changeHandler.handle(e);
    };
    Field.prototype.isFileField = function () {
        return false;
    };
    Field.prototype.extractValueFromChangeEvent = function (event) {
        return event.target.value;
    };
    Field.prototype.shouldCollect = function () {
        return this.state.shouldCollect;
    };
    return Field;
}(React.Component));
export default Field;
