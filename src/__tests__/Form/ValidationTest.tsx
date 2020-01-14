import Validator from "../../lib/Protocol/Validator";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Form from "../../lib/Form/Form";
import DummyField from "../TestingUtils/DummyField";
import FormDefault from "../../lib/Form/FormDefault";


Enzyme.configure({adapter: new Adapter()});

describe('validation', () => {

    class FakeValidator implements Validator {
        validate(value: any, validationRules: any): boolean | string {
            if (value && String(value).trim().length >= 3) {
                return true;
            }
            return 'length is too short';
        }
    }

    FormDefault.setValidator(() => new FakeValidator());

    it('should validate data', function () {
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField},
            {name: 'message', as: DummyField}
        ]}/>);
        const form = wrapper.instance() as Form;

        const nameField = form.getRegisteredField('name')!;
        const messageField = form.getRegisteredField('message')!;

        nameField.setValue('ali', false);

        form.validate();

        expect(nameField.isValid()).toEqual(true);
        expect(messageField.isValid()).toEqual(false);
    });

});