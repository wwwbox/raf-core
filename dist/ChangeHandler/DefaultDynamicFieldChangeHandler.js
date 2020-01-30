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
import DefaultFieldChangeHandler from "./DefaultFieldChangeHandler";
var DefaultDynamicFieldChangeHandler = /** @class */ (function (_super) {
    __extends(DefaultDynamicFieldChangeHandler, _super);
    function DefaultDynamicFieldChangeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getValue = function (event) {
            var value = _this.getField().extractValueFromChangeEvent(event);
            var fullValue = _this.getField().getValue();
            fullValue[event.index] = value;
            return fullValue;
        };
        return _this;
    }
    return DefaultDynamicFieldChangeHandler;
}(DefaultFieldChangeHandler));
export default DefaultDynamicFieldChangeHandler;
