var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
var BaseFieldsRenderer = /** @class */ (function () {
    function BaseFieldsRenderer(form) {
        var _this = this;
        this.renderField = function (config, index) {
            if (Array.isArray(config)) {
                var ArrayWrapper = _this.arrayWrapper();
                return React.createElement(ArrayWrapper, __assign({ key: index }, _this.arrayWrapperProps()), config.map(function (config) { return _this.renderFieldElement(config, true); }));
            }
            else {
                return _this.renderFieldElement(config, false);
            }
        };
        this.arrayWrapper = function () { return React.Fragment; };
        this.arrayWrapperProps = function () { return ({}); };
        this.getInjectedProps = function () {
            var validator = _this.getForm().getValidator();
            return { defaultValidator: validator ? validator : undefined, form: _this.getForm() };
        };
        this.form = form;
    }
    BaseFieldsRenderer.prototype.render = function () {
        var config = this.form.getRenderConfig();
        var fields = config.map(this.renderField);
        return this.renderWrapper(fields);
    };
    BaseFieldsRenderer.prototype.getForm = function () {
        return this.form;
    };
    return BaseFieldsRenderer;
}());
export default BaseFieldsRenderer;
