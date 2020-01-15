import Enzyme, {mount} from "enzyme";
import Form from "../../lib/Form/Form";
import React from "react";
import DummyField from "../../lib/TestingUtils/DummyField";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});

describe('loading', () => {

    it('should set/get loading', function () {
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField}
        ]}/>);
        const form = wrapper.instance()! as Form;

        expect(form.isLoading()).toEqual(false);
        form.startLoading();
        expect(form.isLoading()).toEqual(true);
        form.stopLoading();
        expect(form.isLoading()).toEqual(false);
    });

});