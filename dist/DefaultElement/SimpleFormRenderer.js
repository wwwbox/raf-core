import * as React from "react";
var SimpleFormRenderer = /** @class */ (function () {
    function SimpleFormRenderer(form) {
        this.form = form;
    }
    SimpleFormRenderer.prototype.render = function (content) {
        var _this = this;
        return React.createElement("div", null,
            content,
            React.createElement("button", { onClick: function () { return _this.getForm().submit(); } }, "SUBMIT"));
    };
    SimpleFormRenderer.prototype.getForm = function () {
        return this.form;
    };
    return SimpleFormRenderer;
}());
export default SimpleFormRenderer;
