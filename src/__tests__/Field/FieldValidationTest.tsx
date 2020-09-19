import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import {
    FieldValidationConfiguration,
    getDefaultFieldValidationConfiguration
} from "../../Field/Validation/FieldValidationConfiguration";
import {FieldValidation} from "../../Field/Validation/FieldValidation";
import {mock} from "jest-mock-extended";
import Validator from "../../Protocol/Validator";
import {IEventNameMaker} from "../../Event/IEventNameMaker";
import IField from "../../Field/IField";
import {IFieldEvent} from "../../Field/FieldEvent/FieldEvent";
import {FieldProps} from "../../Field/FieldProps";
import {IFieldValue} from "../../Field/Value/FieldValue";
import {IFieldUI} from "../../Field/UI/FieldUI";
import Field from "../../Field/Concrete/Field";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {FieldMessageType} from "../../Field/UI/FieldUIConfiguration";
import {FieldEvents} from "../../Event/DefaultEvents";

Enzyme.configure({adapter: new Adapter()});


describe('UI Event', () => {

    const FIELD_NAME = "field";
    const FIELD_AS: any = 'div';

    let field: IField;
    let eventNameMaker: IEventNameMaker = mock<IEventNameMaker>();
    let event: IFieldEvent = mock<IFieldEvent>();
    let value: IFieldValue = mock<IFieldValue>();
    let ui: IFieldUI = mock<IFieldUI>();

    function getFieldValidationInstance(config: FieldValidationConfiguration, injectedValidator: any = {}) {
        const props = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: eventNameMaker,
            injectedValidator: injectedValidator,
            ...config,
            form: {fields: jest.fn().mockReturnValue({register: jest.fn()})} as any
        };
        // const component = mount(<Field  {...props} />);
        // field = component.instance() as Field;
        field = mock<IField>({
            event(): IFieldEvent {
                return event;
            },
            getProps(): FieldProps {
                return props;
            },
            value(): IFieldValue {
                return value;
            },
            getConfiguration<T>(): T {
                return config as any;
            },
            ui(): IFieldUI {
                return ui;
            }
        })
        return new FieldValidation(field, "validation");
    }

    function getFieldValidationInstanceWithRealField(config: FieldValidationConfiguration, injectedValidator: any = {}) {
        const props = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: eventNameMaker,
            injectedValidator: injectedValidator,
            ...config,
            form: {fields: jest.fn().mockReturnValue({register: jest.fn()}), event: () => mock<IFormEvent>()} as any
        };
        const component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        return new FieldValidation(field, "validation");
    }


    it('should use injected validator', function () {
        const validator = mock<Validator>({
            validate(): boolean | string {
                return false;
            }
        });
        const validation = getFieldValidationInstance({
            ...getDefaultFieldValidationConfiguration(),
            validator: null
        }, validator);
        const valid = validation.validate();
        expect(valid).toEqual(false);
    });

    it('should use passed validator over injected', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return false;
            }
        });

        const validator = mock<Validator>({
            validate(): boolean | string {
                return true;
            }
        });
        const validation = getFieldValidationInstance({
            ...getDefaultFieldValidationConfiguration(),
            validator: () => validator
        }, injectedValidator);
        const valid = validation.validate();
        expect(valid).toEqual(true);
    });

    it('should skip return true when skip validation set to true', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return false;
            }
        });
        const validation = getFieldValidationInstance({
            ...getDefaultFieldValidationConfiguration(),
            validator: null, skipValidation: true
        }, injectedValidator);
        expect(validation.validate()).toEqual(true);
        expect(validation.validateWithEffect()).toEqual(true);
    });

    it('should test set & get current valid state', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return false;
            }
        });
        const validation = getFieldValidationInstanceWithRealField({
            ...getDefaultFieldValidationConfiguration(),
            valid: false
        }, injectedValidator);

        expect(validation.getCurrentValidState()).toEqual(false);
        const callback = jest.fn();
        validation.set(true, callback);
        expect(validation.getCurrentValidState()).toEqual(true);
        expect(callback).toBeCalled();
    });

    it('should return true only when validation result is true or empty string', function () {
        const injectedValidator = mock<Validator>({
            validate(value: any): boolean | string {
                if (value === 'x') return true;
                if (value === 'y') return '';
                return 'error';
            }
        });

        const validation = getFieldValidationInstance(getDefaultFieldValidationConfiguration(), injectedValidator);

        eventNameMaker = mock<IEventNameMaker>({
            fieldEvent(field: IField, eventName: string): string {
                return "x@" + eventName;
            }
        });

        value.get = jest.fn().mockReturnValue('x');
        expect(validation.validate()).toEqual(true);
        expect(validation.validateWithEffect(false)).toEqual(true);

        value.get = jest.fn().mockReturnValue('y');
        expect(validation.validate()).toEqual(true);
        expect(validation.validateWithEffect(false)).toEqual(true);

        value.get = jest.fn().mockReturnValue('z');
        expect(validation.validate()).toEqual(false);
        expect(validation.validateWithEffect(false)).toEqual(false);
    });

    it('should validate with effect', function () {
        const injectedValidator = mock<Validator>({
            validate(value: any): boolean | string {
                return value === 'ali';
            }
        });
        const validation = getFieldValidationInstanceWithRealField(getDefaultFieldValidationConfiguration(), injectedValidator);
        field.value().set("");
        validation.validateWithEffect(false);
        expect(validation.getCurrentValidState()).toEqual(false);
        field.value().set("ali");
        validation.validateWithEffect(false);
        expect(validation.getCurrentValidState()).toEqual(true);
    });

    it('should update message', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return 'error';
            }
        });
        const validation = getFieldValidationInstanceWithRealField({
            ...getDefaultFieldValidationConfiguration(),
            updateMessageOnValidationFail: true,
            onFailMessageType: FieldMessageType.WARNING
        }, injectedValidator);
        validation.validateWithEffect(false);
        expect(field.ui().getMessage()).toEqual('error');
        expect(field.ui().getMessageType()).toEqual(FieldMessageType.WARNING);
    });

    it('should emit validation fail event on validation fail', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return 'error';
            }
        });
        const validation = getFieldValidationInstance({
            ...getDefaultFieldValidationConfiguration(),
            updateMessageOnValidationFail: true,
            onFailMessageType: FieldMessageType.WARNING
        }, injectedValidator);
        validation.validateWithEffect(true);
        expect(field.event().emitOnThis).toBeCalledWith(FieldEvents.VALIDATION_FAIL, {validationResult: 'error'});
    });

});