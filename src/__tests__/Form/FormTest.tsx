import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "../../Form/Form";
import * as React from "react";
import Submitter from "../../Protocol/Submitter";
import {mock} from "jest-mock-extended";
import {IFormValidation} from "../../Form/FormValidation/FormValidation";
import {IFormValue} from "../../Form/FormValue/FormValue";

Enzyme.configure({adapter: new Adapter()});


describe('Form', () => {

    function getFormInstance(props: any = {fields: []}) {
        const component = mount(<Form {...props} />);
        return component.instance() as Form;
    }

    it('should set initialValues', function () {
        const initialValues = {x: 1, y: 2};
        const form = getFormInstance({initialValues: initialValues, services: {submitter: () => ({})}});
        const mockSet = jest.fn();
        form.value = () => {
            return mock<IFormValue>({
                set: mockSet
            });
        }
        form.componentDidMount();
        expect(mockSet).toBeCalledWith(initialValues);
    });

    it('should use empty as initialValues when not supplied', function () {
        const form = getFormInstance({services: {submitter: () => ({})}});
        const mockSet = jest.fn();
        form.value = () => {
            return mock<IFormValue>({
                set: mockSet
            });
        }
        form.componentDidMount();
        expect(mockSet).toBeCalledWith({});
    });

    it('should update/get internal state', function () {
        const form = getFormInstance({services: {submitter: () => ({})}});
        expect(form.getInternalState()).toEqual({isLoading: false});
        form.updateInternalState({isLoading: true});
        expect(form.getInternalState()).toEqual({isLoading: true});
    });

    it('should not submit if not valid when allowSubmitWhenNotValid is not true', function () {
        const submitter = mock<Submitter>();
        const form = getFormInstance({services: {submitter: () => submitter}});
        form.validation = () => {
            return mock<IFormValidation>({
                validate(): boolean {
                    return false;
                }
            });
        }
        form.submit();
        expect(submitter.submit).not.toBeCalled();
    });

    it('should submit if not valid when allowSubmitWhenNotValid is true', function () {
        const submitter = mock<Submitter>();
        const form = getFormInstance({allowSubmitWhenNotValid: true, services: {submitter: () => submitter}});
        form.validation = () => {
            return mock<IFormValidation>({
                validate(): boolean {
                    return false;
                }
            });
        }
        form.submit();
        expect(submitter.submit).toBeCalled();
    });

});