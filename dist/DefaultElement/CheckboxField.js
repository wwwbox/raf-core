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
import React from "react";
import Field from "../Field/Field";
var CheckboxField = /** @class */ (function (_super) {
    __extends(CheckboxField, _super);
    function CheckboxField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxField.prototype.render = function () {
        var _this = this;
        var _a;
        var wrapperStyle = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';
        var disable = this.isDisableOnLoading() && this.isLoading();
        var label = (_a = this.props.label, (_a !== null && _a !== void 0 ? _a : ''));
        return React.createElement("div", { style: wrapperStyle },
            React.createElement("input", { name: this.getName(), type: 'checkbox', disabled: disable, value: this.getValue(), onChange: function (e) { return _this.handleChange(e); } }),
            React.createElement("label", null, label),
            this.getMessage() &&
                React.createElement("span", { className: "message_type_" + this.getMessageType() }, this.getMessage()));
    };
    CheckboxField.prototype.extractValueFromChangeEvent = function (event) {
        return event.target.checked;
    };
    return CheckboxField;
}(Field));
export default CheckboxField;
