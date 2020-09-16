import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "../../Form/Form";
import React from "react";
import DummyField from "../../TestingUtils/DummyField";

Enzyme.configure({adapter: new Adapter()});


describe('initial values & set values', () => {

    it('should set values', function () {
        const form = mount(<Form fields={[
            {as: DummyField, name: 'name'},
            {as: DummyField, name: 'message'}
        ]}/>).instance() as Form;

        const nameField = form.getRegisteredField('name')!;
        const messageField = form.getRegisteredField('message')!;
        form.setValues({name: 'ali', message: 'hello', nonField: 'some_value'});
        expect(nameField.getValue()).toEqual('ali');
        expect(messageField.getValue()).toEqual('hello');
    });


    it('should set initial values', function () {
        const form = mount(<Form fields={[
            {as: DummyField, name: 'name'},
            {as: DummyField, name: 'message'}
        ]} initialValues={{name: 'ali', message: 'hello'}}/>).instance() as Form;

        const nameField = form.getRegisteredField('name')!;
        const messageField = form.getRegisteredField('message')!;
        expect(nameField.getValue()).toEqual('ali');
        expect(messageField.getValue()).toEqual('hello');
    });


});