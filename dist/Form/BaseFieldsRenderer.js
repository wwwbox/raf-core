var BaseFieldsRenderer = /** @class */ (function () {
    function BaseFieldsRenderer(form) {
        var _this = this;
        this.renderField = function (config) {
            if (Array.isArray(config)) {
                return config.map(function (config) { return _this.renderFieldElement(config, true); });
            }
            else {
                return _this.renderFieldElement(config, false);
            }
        };
        this.getInjectedProps = function () {
            var validator = _this.getForm().getValidator();
            return { defaultValidator: validator ? validator : undefined, form: _this.getForm() };
        };
        this.form = form;
    }
    BaseFieldsRenderer.prototype.render = function () {
        var config = this.form.getRenderConfig();
        var fields = config.map(this.renderField);
        return this.renderWrapper(fields);
    };
    BaseFieldsRenderer.prototype.getForm = function () {
        return this.form;
    };
    return BaseFieldsRenderer;
}());
export default BaseFieldsRenderer;
