import Enzyme, {mount} from "enzyme";
import Form from "../../Form/Form";
import React from "react";
import DummyField from "../../TestingUtils/DummyField";
import Adapter from "enzyme-adapter-react-16";
import {PreDefinedEventType} from "../../Form/AutoFormEvent";

Enzyme.configure({adapter: new Adapter()});

describe('loading', () => {

    it('should set/get loading while keeping value of fields', function (done) {

        const wrapper = mount(<Form on={{
            [PreDefinedEventType.ON_START_LOADING]: () => {
                done();
            },
            [PreDefinedEventType.ON_END_LOADING]: () => {
                done();
            }
        }} fields={[
            {name: 'name', as: DummyField}
        ]}/>);

        const form = wrapper.instance()! as Form;
        const nameField = form.getRegisteredField('name')!;
        nameField.setValue('edited_value');

        expect(form.isLoading()).toEqual(false);
        form.startLoading();
        expect(form.isLoading()).toEqual(true);
        expect(nameField.getValue()).toEqual('edited_value');
        form.stopLoading();
        expect(form.isLoading()).toEqual(false);
        expect(nameField.getValue()).toEqual('edited_value');
    });

});