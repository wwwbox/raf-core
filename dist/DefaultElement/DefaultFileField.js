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
import FileField from "../Field/FileField";
var DefaultFileField = /** @class */ (function (_super) {
    __extends(DefaultFileField, _super);
    function DefaultFileField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultFileField.prototype.render = function () {
        var _this = this;
        var wrapperStyle = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';
        var disable = this.isDisableOnLoading() && this.isLoading();
        return React.createElement("div", { style: wrapperStyle },
            this.props.label && React.createElement("label", null, this.props.label),
            React.createElement("input", { name: this.getName(), type: 'file', multiple: this.props.multiple, disabled: disable, onChange: function (e) { return _this.handleChange(e); } }),
            !this.isValid() && React.createElement("b", { style: { color: 'red' } }, "ERROR"),
            this.getMessage() &&
                React.createElement("span", { className: "message_type_" + this.getMessageType() }, this.getMessage()));
    };
    DefaultFileField.prototype.extractValueFromChangeEvent = function (event) {
        return event.target.files;
    };
    return DefaultFileField;
}(FileField));
export default DefaultFileField;