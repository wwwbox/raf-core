import * as React from "react";
import {FieldUI} from "../../Field/UI/FieldUI";
import {
    FieldMessageType,
    FieldUIConfiguration,
    getDefaultFieldUIConfiguration
} from "../../Field/UI/FieldUIConfiguration";
import {FieldConfigurationTestUtil} from "../../TestingUtils/FieldConfigurationTestUtil";


const testUtils = new FieldConfigurationTestUtil<FieldUIConfiguration, FieldUI>("ui",
    field => new FieldUI(field, "ui")
);


describe('UI Event', () => {

    it('should get/set readonly', function () {
        const callback = jest.fn();
        testUtils.testGet("readonly", true, u => u.isReadonly());
        testUtils.testSet("readonly", false, u => u.setReadonly(false, callback), {}, callback);
    });

    it('should get/set disableOnLoading', function () {
        const callback = jest.fn();
        testUtils.testGet("disableOnLoading", true, u => u.isDisableOnLoading());
        testUtils.testSet("disableOnLoading", false, u => u.setDisableOnLoading(false, callback), {}, callback);
    });

    it('should get/set disable', function () {
        const callback = jest.fn();
        testUtils.testGet("disabled", true, u => u.isDisabled());
        testUtils.testSet("disabled", false, u => u.setDisabled(false, callback), {}, callback);
    });

    it('should get/set loading', function () {
        const callback = jest.fn();
        testUtils.testGet("loading", true, u => u.isLoading());
        testUtils.testSet("loading", false, u => u.setLoading(false, callback), {}, callback);
    });


    it('should get/set hidden', function () {
        const callback = jest.fn();
        testUtils.testGet("hidden", true, u => u.isHidden());
        testUtils.testSet("hidden", false, u => u.setHidden(false, callback), {}, callback);
    });


    it('should get/set message type', function () {
        const callback = jest.fn();
        testUtils.testGet("messageType", FieldMessageType.SUCCESS, u => u.getMessageType());
        testUtils.testSet("messageType", FieldMessageType.WARNING, u => u.setMessageType(FieldMessageType.WARNING, callback), {}, callback);
    });


    it('should get/set message', function () {
        const callback = jest.fn();
        testUtils.testGet("message", "test", u => u.getMessage());
        testUtils.testSet("message", "msg", u => u.setMessage("msg", callback), {}, callback);
    });

    it('should get/set disableOnFormLoading', function () {
        testUtils.testGet("disableOnFormLoading", true, u => u.isDisableOnFormLoading());
        testUtils.testSet("disableOnFormLoading", false, u => u.setDisableOnFormLoading(false), {});
    });

});

describe('ShouldDisable', () => {
    const makeUiInstance = (disableOnFromLoading: boolean = false, isLoading: boolean = false,
                            disable: boolean = false, disableOnLoading: boolean = false, formLoading: boolean = false
    ) =>
        testUtils.getInstance({
            ...getDefaultFieldUIConfiguration(),
            disabled: disable,
            disableOnFormLoading: disableOnFromLoading,
            disableOnLoading: disableOnLoading,
            loading: isLoading
        }, {
            getForm: () => ({
                ui: () => ({isLoading: jest.fn().mockReturnValue(formLoading)})
            })
        });

    it('should disable when form isLoading and disableOnFormLoading is true', function () {
        let ui = makeUiInstance(false, false, false, false, true);
        expect(ui.shouldDisable()).toEqual(false);
        ui = makeUiInstance(true, false, false, false, true);
        expect(ui.shouldDisable()).toEqual(true);
    });

    it('should disable when field isLoading and disableOnLoading is true', function () {
        let ui = makeUiInstance(false, true, false, false);
        expect(ui.shouldDisable()).toEqual(false);
        ui = makeUiInstance(true, false, false, true, true);
        expect(ui.shouldDisable()).toEqual(true);
    });

    it('should disable when field disabled', function () {
        let ui = makeUiInstance(false, false, false, false, false);
        expect(ui.shouldDisable()).toEqual(false);
        ui = makeUiInstance(true, false, true, false, true);
        expect(ui.shouldDisable()).toEqual(true);
    });
})