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
import * as React from "react";
import FormDefault from "./FormDefault";
import Setup from "./FormServiceSetup";
import CollectedData from "../Utils/CollectedData";
import { PreDefinedEventType } from "./AutoFormEvent";
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, props) || this;
        _this.attachedData = new CollectedData();
        _this.getFieldsRenderer = function () {
            return _this.fieldRenderer;
        };
        _this.getValidator = function () {
            return _this.validator;
        };
        _this.registerField = function (field) {
            _this.registeredFields.push(field);
        };
        _this.getRegisteredFields = function () {
            return _this.registeredFields;
        };
        _this.getRegisteredField = function (name) {
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var field = _a[_i];
                if (field.getName() === name)
                    return field;
            }
            return undefined;
        };
        _this.startLoading = function () {
            _this.setState({ loading: true }, function () {
                _this.emitEvent({
                    type: PreDefinedEventType.ON_START_LOADING
                });
            });
        };
        _this.stopLoading = function () {
            _this.setState({ loading: false }, function () {
                _this.emitEvent({
                    type: PreDefinedEventType.ON_END_LOADING
                });
            });
        };
        _this.isLoading = function () {
            return _this.state.loading;
        };
        _this.getRenderConfig = function () {
            return _this.props.fields;
        };
        _this.collect = function () {
            if (!_this.isReadyToCollect())
                throw new Error('FORM IS NOT READY TO COLLECT');
            var collectedData = new CollectedData();
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var field = _a[_i];
                if (!field.shouldCollect())
                    continue;
                if (field.isFileField())
                    collectedData.appendFile(field.getName(), field.getValue());
                else {
                    if (field.isAsQuery())
                        collectedData.appendQuery(field.getName(), field.getValue());
                    else
                        collectedData.append(field.getName(), field.getValue());
                }
            }
            collectedData.merge(_this.attachedData);
            return collectedData;
        };
        _this.isReadyToCollect = function () {
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var field = _a[_i];
                if (!field.isReadyToCollect())
                    return false;
            }
            return true;
        };
        _this.attach = function (key, value) {
            _this.attachedData.append(key, value);
        };
        _this.deAttach = function (key) {
            _this.attachedData.remove(key);
        };
        _this.attachFile = function (key, file) {
            _this.attachedData.appendFile(key, file);
        };
        _this.deAttachFile = function (key) {
            _this.attachedData.removeFile(key);
        };
        _this.validate = function () {
            var valid = true;
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var field = _a[_i];
                if (!field.shouldValidate())
                    continue;
                if (field.validate())
                    valid = false;
            }
            return valid;
        };
        _this.submit = function () {
            if (!_this.submitter)
                throw Error('CANNOT FIND Submitter');
            _this.submitter.submit();
        };
        _this.emitEvent = function (event) {
            _this.emitEventTo(_this, _this.props.on ? _this.props.on : {}, event.type, event.payload);
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var field = _a[_i];
                _this.emitEventTo(field, field.getListeners(), event.type, event.payload);
            }
        };
        _this.emitEventTo = function (owner, listeners, emittedEvent, payload) {
            var events = Object.keys(listeners);
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event_1 = events_1[_i];
                if (emittedEvent === event_1) {
                    var listener = listeners[event_1];
                    listener(owner, payload);
                }
            }
        };
        _this.onAnyValueChanged = function (key, value, field) {
            if (_this.props.onAnyValueChanged) {
                _this.props.onAnyValueChanged(key, value, field, _this);
            }
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var f = _a[_i];
                if (f.getName() !== key && f.getProps().onOtherChange) {
                    f.getProps().onOtherChange(key, value, field);
                }
            }
        };
        _this.reset = function () {
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var field = _a[_i];
                field.reset();
            }
        };
        _this.clear = function () {
            for (var _i = 0, _a = _this.getRegisteredFields(); _i < _a.length; _i++) {
                var field = _a[_i];
                field.clear();
            }
        };
        _this.setValues = function (values) {
            var keys = Object.keys(values);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var field = _this.getRegisteredField(key);
                if (field) {
                    field.setValue(values[key]);
                }
            }
        };
        _this.state = { loading: false };
        _this.formRenderer = Setup.getDefaultServiceOrPassed(_this, (_a = props.services) === null || _a === void 0 ? void 0 : _a.formRenderer, FormDefault.getFormRenderer());
        _this.fieldRenderer = Setup.getDefaultServiceOrPassed(_this, (_b = props.services) === null || _b === void 0 ? void 0 : _b.fieldsRenderer, FormDefault.getFieldRenderer());
        _this.collector = Setup.getDefaultServiceOrPassed(_this, (_c = props.services) === null || _c === void 0 ? void 0 : _c.collector, FormDefault.getCollector());
        _this.submitter = Setup.getDefaultServiceOrPassed(_this, (_d = props.services) === null || _d === void 0 ? void 0 : _d.submitter, FormDefault.getSubmitter());
        _this.validator = Setup.getDefaultServiceOrPassed(_this, (_e = props.services) === null || _e === void 0 ? void 0 : _e.validator, FormDefault.getValidator());
        _this.registeredFields = [];
        _this.setupAttachedData();
        return _this;
    }
    Form.prototype.componentDidMount = function () {
        var values = this.props.initialValues ? this.props.initialValues : {};
        this.setValues(values);
    };
    Form.prototype.setupAttachedData = function () {
        var _a, _b;
        this.attachedData = new CollectedData();
        if ((_a = this.props.attach) === null || _a === void 0 ? void 0 : _a.data) {
            this.attachedData.appendData(this.props.attach.data);
        }
        if ((_b = this.props.attach) === null || _b === void 0 ? void 0 : _b.files) {
            this.attachedData.appendFiles(this.props.attach.files);
        }
    };
    Form.prototype.render = function () {
        var fields = this.getFieldsRenderer().render();
        return this.formRenderer.render(fields);
    };
    return Form;
}(React.Component));
export default Form;
