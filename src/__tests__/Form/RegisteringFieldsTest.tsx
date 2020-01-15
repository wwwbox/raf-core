import Enzyme, {mount} from "enzyme";
import React from "react";
import Form from "../../lib/Form/Form";
import DummyField from "../../lib/TestingUtils/DummyField";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});


describe('registering fields', () => {

    it('should register fields', function () {
        const wrapper = mount(<Form fields={[
            {as: DummyField, name: 'test_name'}
        ]}/>);
        const instance: Form = wrapper.instance() as any;

        const registeredFields = instance.getRegisteredFields();
        expect(registeredFields).toHaveLength(1);
        expect(registeredFields[0].getName()).toEqual('test_name');
    });

    it('should register many fields', function () {
        const wrapper = mount(<Form fields={[
            {as: DummyField, name: 'test_name'},
            [
                {as: DummyField, name: 'username'},
                {as: DummyField, name: 'password', readonly: true},
            ]
        ]}/>);
        const instance: Form = wrapper.instance() as any;

        const registeredFields = instance.getRegisteredFields();
        expect(registeredFields).toHaveLength(3);
        expect(registeredFields[0].getName()).toEqual('test_name');
        expect(registeredFields[1].getName()).toEqual('username');
        expect(registeredFields[2].getName()).toEqual('password');
        expect(registeredFields[2].isReadonly()).toEqual(true);
    });


    it('should return registered field', function () {
        const wrapper = mount(<Form fields={[
            {as: DummyField, name: 'test_name'},
            [
                {as: DummyField, name: 'username'},
                {as: DummyField, name: 'password', readonly: true},
            ]
        ]}/>);
        const instance: Form = wrapper.instance() as any;
        const field = instance.getRegisteredField('username');
        expect(field).toBeTruthy();
        expect(field!.getName()).toEqual('username');


        const nonField = instance.getRegisteredField('some_name_that_not_exists');
        expect(nonField).toBeUndefined();
    });

});