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
import Field from "../Field/Field";
import React from "react";
var SelectField = /** @class */ (function (_super) {
    __extends(SelectField, _super);
    function SelectField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectField.prototype.render = function () {
        var _this = this;
        var _a;
        var wrapperStyle = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';
        var disable = this.isDisableOnLoading() && this.isLoading();
        var options = (_a = this.props.options, (_a !== null && _a !== void 0 ? _a : []));
        return React.createElement("div", { style: wrapperStyle },
            React.createElement("select", { name: this.getName(), disabled: disable, value: this.getValue(), onChange: function (e) { return _this.handleChange(e); } }, options.map(function (option, index) {
                return React.createElement("option", { key: index, value: option.value }, option.label);
            })),
            this.getMessage() &&
                React.createElement("span", { className: "message_type_" + this.getMessageType() }, this.getMessage()));
    };
    return SelectField;
}(Field));
export default SelectField;
