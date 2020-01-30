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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import Field from "./Field";
import DefaultDynamicFieldChangeHandler from "../ChangeHandler/DefaultDynamicFieldChangeHandler";
var DynamicField = /** @class */ (function (_super) {
    __extends(DynamicField, _super);
    function DynamicField(props) {
        var _this = _super.call(this, props) || this;
        _this.addInput = function (startingValue) {
            if (startingValue === void 0) { startingValue = ''; }
            var value = __spreadArrays(_this.getValue());
            if (_this.getProps().maxInputs <= value.length) {
                _this.getProps().onMaxInputExceeded && _this.getProps().onMaxInputExceeded(_this);
                return;
            }
            value.push(startingValue);
            _this.setValue(value);
        };
        _this.removeInput = function (index) {
            var value = __spreadArrays(_this.getValue());
            value.splice(index, 1);
            _this.setValue(value);
        };
        var startingValue = props.startingValue ? (Array.isArray(props.startingValue) ? __spreadArrays(props.startingValue) : [props.startingValue]) : [''];
        _this.state = __assign(__assign({}, _this.state), { value: startingValue });
        _this.changeHandler = props.changeHandler ? props.changeHandler(_this) : new DefaultDynamicFieldChangeHandler(_this);
        return _this;
    }
    return DynamicField;
}(Field));
export default DynamicField;
