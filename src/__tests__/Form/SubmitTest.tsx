import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "../../Form/Form";
import DummyField from "../../TestingUtils/DummyField";
import React from "react";
import Submitter from "../../Protocol/Submitter";
import IForm from "../../Form/IForm";

Enzyme.configure({adapter: new Adapter()});


class FakeSubmitter implements Submitter {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    getForm(): IForm {
        return this.form;
    }

    submit(): void {
        // SUBMIT
    }

}

describe('submit', () => {

    it('should throw exception when no submitter available', function () {
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField}
        ]}/>);
        const form = wrapper.instance() as Form;
        expect(() => form.submit()).toThrowError();
    });


    it('should throw exception when no submitter available', function () {

        let submitter: Submitter;

        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField}
        ]} services={{
            submitter: form => {
                submitter = new FakeSubmitter(form);
                submitter.submit = jest.fn();
                return submitter;
            }
        }}/>);

        const form = wrapper.instance() as Form;
        form.submit();

        // noinspection JSUnusedAssignment
        expect(submitter!.submit).toBeCalled();
    });

});