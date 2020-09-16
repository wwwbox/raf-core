import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Field from "../../Field/Concrete/Field";
import * as React from "react";
import {FieldProps} from "../../Field/FieldProps";
import {FieldMessageType} from "../../Field/FieldConfig";
import Validator from "../../Protocol/Validator";
import FieldChangeHandler from "../../Protocol/FieldChangeHandler";
import IField from "../../Field/IField";
import Form from "../../Form/Form";
import IForm from "../../Form/IForm";
import DummyField from "../../TestingUtils/DummyField";

Enzyme.configure({adapter: new Adapter()});

describe('Field', () => {

    let field: Field;
    let props: FieldProps;
    let component: any;
    beforeEach(() => {
        const form: any = {registerField: jest.fn()};
        props = {name: 'testName', loading: true, form: form};
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
    });

    it('should change/get value', function () {
        expect(field.getValue()).toEqual('');
        field.setValue('ali');
        expect(field.getValue()).toEqual('ali');
    });

    it('should change/get readonly', function () {
        expect(field.isReadonly()).toEqual(false);
        field.setReadonly(true);
        expect(field.isReadonly()).toEqual(true);
    });

    it('should change/get message', function () {
        expect(field.getMessage()).toEqual(undefined);
        field.setMessage('some message');
        expect(field.getMessage()).toEqual('some message');
    });

    it('should change/get message type', function () {
        expect(field.getMessageType()).toEqual(undefined);
        field.setMessageType(FieldMessageType.ERROR);
        expect(field.getMessageType()).toEqual(FieldMessageType.ERROR);
    });

    it('should change/get disableOnLoading', function () {
        expect(field.isDisableOnLoading()).toEqual(false);
        field.setDisableOnLoading(true);
        expect(field.isDisableOnLoading()).toEqual(true);
    });

    it('should change/get asQuery', function () {
        expect(field.isAsQuery()).toEqual(false);
        field.setAsQuery(true);
        expect(field.isAsQuery()).toEqual(true);
    });

    it('should change/get validationRules', function () {
        expect(field.getValidationRules()).toEqual(undefined);
        field.setValidationRules({required: true});
        expect(field.getValidationRules()).toEqual({required: true});
    });

    it('should change/get escapeValidation', function () {
        expect(field.isEscapeValidation()).toEqual(false);
        field.setEscapeValidation(true);
        expect(field.isEscapeValidation()).toEqual(true);
    });

    it('should change/get validateOnChange', function () {
        expect(field.isValidateOnChange()).toEqual(true);
        field.setValidateOnChange(false);
        expect(field.isValidateOnChange()).toEqual(false);
    });

    it('should getName', function () {
        expect(field.getName()).toEqual('testName');
    });

    it('should change/get validation state', function () {
        expect(field.isValid()).toEqual(true);
        field.error();
        expect(field.isValid()).toEqual(false);
        field.error(false);
        expect(field.isValid()).toEqual(true);
    });

    it('should getState ', function () {
        expect(field.getState()).toEqual(field.state);
    });

    it('should changeState', function () {
        const prevState = {...field.getState()};
        field.changeState({error: false, x: 1});
        const newState = {...prevState, error: false, x: 1};
        expect(field.getState()).toEqual(newState);
    });

    it('should clear value', function () {
        field.setValue('ali');
        expect(field.getValue()).toEqual('ali');
        field.clear();
        expect(field.getValue()).toEqual('');
    });

    describe('validation', () => {

        const validator: Validator = {
            validate(value: any): boolean | string {
                return value === 'ali' ? true : 'something wrong';
            }
        };

        it('should validate', function () {

            const form: any = {registerField: jest.fn()};
            const props = {name: 'testName', form: form, loading: true, validator: () => validator};
            const component = mount(<Field {...props} />);
            const field = component.instance() as Field;

            field.validate();
            expect(field.isValid()).toEqual(false);
            field.setValue('ali');
            field.validate();
            expect(field.isValid()).toEqual(true);
        });

        it('should call onValidation', function (done) {

            const form: any = {registerField: jest.fn()};
            const props = {
                name: 'testName', form: form, loading: true,
                onValidation: (validationState: any, p: any) => {
                    expect(validationState).toEqual('something wrong');
                    expect(p).toBe(field);
                    done();
                },
                validator: () => validator
            };
            const component = mount(<Field {...props} />);
            const field = component.instance() as Field;
            field.validate();
        });

        it('should throw error when no validator found', function () {
            const form: any = {registerField: jest.fn()};
            const props = {name: 'testName', form: form, loading: true};
            const component = mount(<Field {...props} />);
            const field = component.instance() as Field;

            expect(() => field.validate()).toThrowError()
        });

        it('should throw error when shouldValidate equal to false', function () {
            const form: any = {registerField: jest.fn()};
            const props = {
                name: 'testName', form: form, loading: true, validator: () => validator
            };
            const component = mount(<Field {...props} />);
            const field = component.instance() as Field;
            field.setShouldValidate(false);
            expect(() => field.validate()).toThrowError()
        });

        it('should validate after setValue called with true to validateAfterChange', function () {
            const form: any = {registerField: jest.fn()};
            const props = {name: 'testName', form: form, loading: true};
            const component = mount(<Field validator={() => validator} {...props} />);
            const field = component.instance() as Field;

            expect(field.isValid()).toBe(true);
            field.setValue('not valid value', true);
            expect(field.isValid()).toBe(false);
        });

    });

    describe('handle change', () => {
        let handler: FieldChangeHandler = {
            getField(): IField {
                return null as any;
            }, handle: jest.fn()
        };

        it('should call handler handle method', function () {
            const form: any = {registerField: jest.fn()};
            const props = {
                name: 'testName', form: form, loading: true,
                onValidation: (validationState: any, p: any) => {
                    expect(validationState).toEqual('something wrong');
                    expect(p).toBe(field);

                },
                changeHandler: () => handler
            };
            const component = mount(<Field {...props} />);
            const field = component.instance() as Field;
            field.handleChange('some_event');

            expect(handler.handle).toBeCalledWith('some_event');
        });
    });

    it('should use passed configuration', function () {
        const form: any = {registerField: jest.fn()};
        const props = {name: 'testName', form: form, loading: true, escapeValidation: true};
        const component = mount(<Field {...props} />);
        const field = component.instance() as Field;
        expect(field.isEscapeValidation()).toEqual(true);
    });

    it('should change/get isReadyToCollect', function () {
        expect(field.isReadyToCollect()).toEqual(true);
        field.setReadyToCollect(false);
        expect(field.isReadyToCollect()).toEqual(false);
    });

    it('should change/get hidden', function () {
        expect(field.isHidden()).toEqual(false);
        field.setHidden(true);
        expect(field.isHidden()).toEqual(true);
    });

    it('should get form instance', function () {
        const form: any = {registerField: jest.fn()};
        props = {name: 'testName', loading: true, form: form};
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        expect(field.getForm()).toBe(form);
    });

    it('should notify form field when changed', function () {
        const wrapper = mount(<Form
            services={{validator: () => ({validate: () => true}) as any}}
            onAnyValueChanged={(key: string, value: any, field: IField, f: IForm) => {
                expect(field).toBe(passwordField);
                expect(key).toEqual('password');
                expect(value).toEqual('pass');
                expect(f).toBe(form);
            }} fields={[
            {
                as: DummyField, name: 'username'
            },
            {
                as: DummyField, name: 'password', onOtherChange: () => {
                    throw Error('THIS SHOULD NOT BE CALLED');
                }
            },
            {
                as: DummyField, name: 'rememberMe'
            }
        ]}/>);

        const form = wrapper.instance() as Form;
        const passwordField = form.getRegisteredField('password')!;

        passwordField.handleChange({target: {value: 'pass'}});
    });

    it('should notify other field when changed', function () {
        const wrapper = mount(<Form
            services={{validator: () => ({validate: () => true}) as any}}
            fields={[
                {
                    as: DummyField, name: 'username', onOtherChange: (key: string, value: any, field: IField) => {
                        expect(field).toBe(passwordField);
                        expect(key).toEqual('password');
                        expect(value).toEqual('pass');
                    }
                },
                {
                    as: DummyField, name: 'password', onOtherChange: () => {
                        throw Error('THIS SHOULD NOT BE CALLED');
                    }
                },
                {
                    as: DummyField, name: 'rememberMe'
                }
            ]}/>);

        const form = wrapper.instance() as Form;
        const passwordField = form.getRegisteredField('password')!;

        passwordField.handleChange({target: {value: 'pass'}});
    });

    it('should return props', function () {
        const form: any = {registerField: jest.fn()};
        props = {name: 'testName', loading: true, form: form};
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        expect(field.getProps()).toEqual(props);
    });

    it('should return isLoading(false) when isLoading is undefined', function () {
        const form: any = {registerField: jest.fn()};
        props = {name: 'testName', form: form};
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        expect(field.isLoading()).toEqual(false);
    });

    it('should return isLoading from props', function () {
        const form: any = {registerField: jest.fn()};
        props = {name: 'testName', loading: true, form: form};
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        expect(field.isLoading()).toEqual(true);
    });

    it('should reset value to startingValue', function () {
        const form: any = {registerField: jest.fn()};
        props = {name: 'testName', startingValue: 'ali', form: form};
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        field.setValue('test');
        field.reset();
        expect(field.getValue()).toEqual('ali');
    });

    it('should reset value to empty when no startingValue', function () {
        const form: any = {registerField: jest.fn()};
        props = {name: 'testName', form: form};
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        field.setValue('test');
        field.reset();
        expect(field.getValue()).toEqual('');
    });

    it('should get/set shouldCollect', function () {
        expect(field.shouldCollect()).toEqual(true);
        field.setShouldCollect(false);
        expect(field.shouldCollect()).toEqual(false);
    });

    it('should get/set shouldValidate', function () {
        expect(field.shouldValidate()).toEqual(true);
        field.setShouldValidate(false);
        expect(field.shouldValidate()).toEqual(false);
    });

});
