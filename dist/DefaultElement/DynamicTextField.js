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
import DynamicField from "../Field/DynamicField";
import React from "react";
var DynamicTextField = /** @class */ (function (_super) {
    __extends(DynamicTextField, _super);
    function DynamicTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DynamicTextField.prototype.render = function () {
        var _this = this;
        var value = this.state.value;
        return React.createElement("div", null,
            this.props.label && React.createElement("h4", { style: { margin: 0 } }, this.props.label),
            React.createElement("button", { onClick: function () { return _this.addInput(); } }, "ADD INPUT"),
            value.map(function (v, index) { return React.createElement("div", { key: index },
                React.createElement("input", { value: v, type: 'text', onChange: function (e) { return _this.handleChange(__assign(__assign({}, e), { index: index })); } }),
                React.createElement("button", { onClick: function () { return _this.removeInput(index); } }, "REMOVE")); }));
    };
    return DynamicTextField;
}(DynamicField));
export default DynamicTextField;
