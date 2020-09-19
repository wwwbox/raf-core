import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Field from "../../Field/Concrete/Field";
import * as React from "react";
import {FieldUI} from "../../Field/UI/FieldUI";
import {
    FieldMessageType,
    FieldUIConfiguration,
    getDefaultFieldUIConfiguration
} from "../../Field/UI/FieldUIConfiguration";

Enzyme.configure({adapter: new Adapter()});


describe('UI Event', () => {

    const FIELD_NAME = "field";
    const FIELD_AS: any = 'div';

    let field: Field;


    function getFieldUIInstance(config: FieldUIConfiguration) {

        const props = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: {} as any,
            injectedValidator: {} as any,
            ...config,
            form: {fields: jest.fn().mockReturnValue({register: jest.fn()})} as any
        };
        const component = mount(<Field  {...props} />);
        field = component.instance() as Field;


        return new FieldUI(field, "ui");
    }

    it('should get/set readonly', function () {
        const ui = getFieldUIInstance({...getDefaultFieldUIConfiguration(), readonly: true});
        expect(ui.isReadonly()).toEqual(true);
        const callback = jest.fn();
        ui.setReadonly(false, callback);
        expect(ui.isReadonly()).toEqual(false);
        expect(callback).toBeCalled();
    });

    it('should get/set disableOnLoading', function () {
        const ui = getFieldUIInstance({...getDefaultFieldUIConfiguration(), disableOnLoading: true});
        expect(ui.isDisableOnLoading()).toEqual(true);
        const callback = jest.fn();
        ui.setDisableOnLoading(false, callback);
        expect(ui.isDisableOnLoading()).toEqual(false);
        expect(callback).toBeCalled();
    });

    it('should get/set disable', function () {
        const ui = getFieldUIInstance({...getDefaultFieldUIConfiguration(), disabled: true});
        expect(ui.isDisabled()).toEqual(true);
        const callback = jest.fn();
        ui.setDisabled(false, callback);
        expect(ui.isDisabled()).toEqual(false);
        expect(callback).toBeCalled();
    });

    it('should get/set loading', function () {
        const ui = getFieldUIInstance({...getDefaultFieldUIConfiguration(), loading: true});
        expect(ui.isLoading()).toEqual(true);
        const callback = jest.fn();
        ui.setLoading(false, callback);
        expect(ui.isLoading()).toEqual(false);
        expect(callback).toBeCalled();
    });


    it('should get/set hidden', function () {
        const ui = getFieldUIInstance({...getDefaultFieldUIConfiguration(), hidden: true});
        expect(ui.isHidden()).toEqual(true);
        const callback = jest.fn();
        ui.setHidden(false, callback);
        expect(ui.isHidden()).toEqual(false);
        expect(callback).toBeCalled();
    });


    it('should get/set message type', function () {
        const ui = getFieldUIInstance({...getDefaultFieldUIConfiguration(), messageType: FieldMessageType.ERROR});
        expect(ui.getMessageType()).toEqual(FieldMessageType.ERROR);
        const callback = jest.fn();
        ui.setMessageType(FieldMessageType.SUCCESS, callback);
        expect(ui.getMessageType()).toEqual(FieldMessageType.SUCCESS);
        expect(callback).toBeCalled();
    });


    it('should get/set message', function () {
        const ui = getFieldUIInstance({...getDefaultFieldUIConfiguration(), message: "Test"});
        expect(ui.getMessage()).toEqual("Test");
        const callback = jest.fn();
        ui.setMessage("XYZ", callback);
        expect(ui.getMessage()).toEqual("XYZ");
        expect(callback).toBeCalled();
    });
})