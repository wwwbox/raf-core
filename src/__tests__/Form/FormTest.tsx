import Enzyme, {mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Form from "../../Form/Form";
import * as React from "react";
import Submitter from "../../Protocol/Submitter";
import {mock} from "jest-mock-extended";
import {IFormValidation} from "../../Form/FormValidation/FormValidation";
import {IFormValue} from "../../Form/FormValue/FormValue";
import IForm from "../../Form/IForm";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {GlobalEvents} from "../../Event/DefaultEvents";

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


    describe("Submitting", () => {

        function makeForm(mockedSubmitter: any, validState: boolean = true, allowSubmitWhenNotValid: boolean = false, ready: boolean = true, mockedEvent: IFormEvent = mock<IFormEvent>()): IForm {
            const form = getFormInstance({
                services: {
                    submitter: mockedSubmitter,
                },
                allowSubmitWhenNotValid: allowSubmitWhenNotValid,
            });
            form.validation = () => mock<IFormValidation>({
                validate(): boolean {
                    return validState;
                }
            });
            form.value = () => mock<IFormValue>({
                isReady(): boolean {
                    return ready;
                }
            })
            form.event = () => mockedEvent;
            return form;
        }

        it('should not submit when form is not valid and not allowed to submit when not valid', function () {
            const submitter = mock<Submitter>();
            const form = makeForm(() => submitter, false, false);
            form.submit();
            expect(submitter.submit).not.toBeCalled();
        });

        it('should not submit when form is not ready to collect', function () {
            const submitter = mock<Submitter>();
            const mockedEvent = mock<IFormEvent>();
            const form = makeForm(() => submitter, true, false, false, mockedEvent);
            form.submit();
            expect(submitter.submit).not.toBeCalled();
            expect(mockedEvent.emit).toBeCalledWith(GlobalEvents.FORM_NOT_READY_TO_COLLECT, {});
        });

        it('should submit form', function () {
            const submitter = mock<Submitter>();
            const form = makeForm(() => submitter);
            form.submit();
            expect(submitter.submit).toBeCalled();
        });
    });

});