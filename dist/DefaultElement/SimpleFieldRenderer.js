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
import * as React from "react";
import BaseFieldsRenderer from "../Form/BaseFieldsRenderer";
var SimpleFieldRenderer = /** @class */ (function (_super) {
    __extends(SimpleFieldRenderer, _super);
    function SimpleFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleFieldRenderer.prototype.renderFieldElement = function (config, inArray) {
        var Component = config.as;
        var props = __assign(__assign({}, config), this.getInjectedProps());
        return React.createElement(Component, __assign({ key: config.name }, props));
    };
    SimpleFieldRenderer.prototype.renderWrapper = function (fields) {
        return React.createElement("div", null, fields);
    };
    return SimpleFieldRenderer;
}(BaseFieldsRenderer));
export default SimpleFieldRenderer;
