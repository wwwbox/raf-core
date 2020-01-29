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
var DummyField = /** @class */ (function (_super) {
    __extends(DummyField, _super);
    function DummyField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DummyField.prototype.render = function () {
        return React.createElement("input", null);
    };
    return DummyField;
}(Field));
export default DummyField;
var DummyFileField = /** @class */ (function (_super) {
    __extends(DummyFileField, _super);
    function DummyFileField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DummyFileField.prototype.render = function () {
        return React.createElement("input", null);
    };
    DummyFileField.prototype.isFileField = function () {
        return true;
    };
    return DummyFileField;
}(Field));
export { DummyFileField };
