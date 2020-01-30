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
var TextAreaField = /** @class */ (function (_super) {
    __extends(TextAreaField, _super);
    function TextAreaField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaField.prototype.render = function () {
        var _this = this;
        var wrapperStyle = {};
        if (this.isHidden())
            wrapperStyle["display"] = 'none';
        var disable = this.isDisableOnLoading() && this.isLoading();
        return React.createElement("div", { style: wrapperStyle },
            React.createElement("textarea", { name: this.getName(), rows: 4, disabled: disable, value: this.getValue(), onChange: function (e) { return _this.handleChange(e); } }),
            this.getMessage() &&
                React.createElement("span", { className: "message_type_" + this.getMessageType() }, this.getMessage()));
    };
    return TextAreaField;
}(Field));
export default TextAreaField;
