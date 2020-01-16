import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "../../lib/Form/Form";
import React from "react";
import DummyField from "../../lib/TestingUtils/DummyField";

Enzyme.configure({adapter: new Adapter()});


describe('clear & reset', () => {

    it('should clear form', function () {
        const form = mount(<Form fields={[
            {as: DummyField, name: 'name'},
            {as: DummyField, name: 'message'}
        ]}/>).instance() as Form;

        const nameField = form.getRegisteredField('name')!;
        const messageField = form.getRegisteredField('message')!;
        nameField.setValue('ali');
        messageField.setValue('hello');
        form.clear();
        expect(nameField.getValue()).toEqual('');
        expect(messageField.getValue()).toEqual('');
    });

    it('should reset form', function () {
        const form = mount(<Form fields={[
            {as: DummyField, name: 'name', startingValue: 'x'},
            {as: DummyField, name: 'message'}
        ]}/>).instance() as Form;

        const nameField = form.getRegisteredField('name')!;
        const messageField = form.getRegisteredField('message')!;
        nameField.setValue('ali');
        messageField.setValue('hello');
        form.reset();
        expect(nameField.getValue()).toEqual('x');
        expect(messageField.getValue()).toEqual('');
    });

});