import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "../../lib/Form/Form";
import React from "react";
import IForm from "../../lib/Form/IForm";
import DummyField from "../TestingUtils/DummyField";
import IField from "../../lib/Field/IField";

Enzyme.configure({adapter: new Adapter()});


describe('events', () => {

    it('should emit/listen event', function () {

        const EVENT_NAME = 'SOME_EVENT_NAME';


        const wrapper = mount(<Form fields={[]} on={{
            [EVENT_NAME]: (f: IForm, payload: any) => {
                expect(f).toBe(form);
                expect(payload).toEqual('some_payload');
            },
            OTHER_EVENT_NAME: () => {
                throw Error();
            }
        }}/>);

        const form = wrapper.instance() as Form;

        form.emitEvent({type: EVENT_NAME, payload: 'some_payload'});
    });

    it('should emit/listen event for fields and form', function () {

        const EVENT_NAME = 'SOME_EVENT_NAME';

        const wrapper = mount(<Form fields={[
            {
                name: 'name', as: DummyField, on: {
                    [EVENT_NAME]: (field: IField, payload: any) => {
                        expect(field).toBe(nameField);
                        expect(payload).toEqual('some_payload');
                    }
                }
            }
        ]} on={{
            [EVENT_NAME]: (f: IForm, payload: any) => {
                expect(f).toBe(form);
                expect(payload).toEqual('some_payload');
            },
            OTHER_EVENT_NAME: () => {
                throw Error();
            }
        }}/>);

        const form = wrapper.instance() as Form;
        const nameField = form.getRegisteredField('name')!;

        form.emitEvent({type: EVENT_NAME, payload: 'some_payload'});
    });


});