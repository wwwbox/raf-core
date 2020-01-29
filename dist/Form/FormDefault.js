import SimpleFormRenderer from "../DefaultElement/SimpleFormRenderer";
import SimpleFieldRenderer from "../DefaultElement/SimpleFieldRenderer";
var FormDefault = /** @class */ (function () {
    function FormDefault() {
    }
    FormDefault.setFormRenderer = function (formRenderer) {
        this.defaultFormRenderer = formRenderer;
    };
    FormDefault.setFieldRenderer = function (fieldRenderer) {
        this.defaultFieldRenderer = fieldRenderer;
    };
    FormDefault.setSubmitter = function (submitter) {
        this.defaultSubmitter = submitter;
    };
    FormDefault.setCollector = function (collector) {
        this.defaultCollector = collector;
    };
    FormDefault.setValidator = function (validator) {
        this.defaultValidator = validator;
    };
    FormDefault.getFormRenderer = function () {
        if (FormDefault.defaultFormRenderer) {
            return FormDefault.defaultFormRenderer;
        }
        return function (form) { return new SimpleFormRenderer(form); };
    };
    FormDefault.getFieldRenderer = function () {
        if (FormDefault.defaultFieldRenderer) {
            return FormDefault.defaultFieldRenderer;
        }
        return function (form) { return new SimpleFieldRenderer(form); };
    };
    FormDefault.getSubmitter = function () {
        if (FormDefault.defaultSubmitter) {
            return FormDefault.defaultSubmitter;
        }
        return null;
    };
    FormDefault.getValidator = function () {
        if (FormDefault.defaultValidator) {
            return FormDefault.defaultValidator;
        }
        return null;
    };
    FormDefault.getCollector = function () {
        if (FormDefault.defaultCollector) {
            return FormDefault.defaultCollector;
        }
        return null;
    };
    FormDefault.unsetDefaults = function () {
        FormDefault.defaultCollector = undefined;
        FormDefault.defaultFieldRenderer = undefined;
        FormDefault.defaultFormRenderer = undefined;
        FormDefault.defaultSubmitter = undefined;
        FormDefault.defaultValidator = undefined;
    };
    return FormDefault;
}());
export default FormDefault;
