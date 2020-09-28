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
import {FieldValue, IFieldValue} from "../../Field/Value/FieldValue";
import {IFieldUI} from "../../Field/UI/FieldUI";
import Field from "../../Field/Concrete/Field";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {FieldMessageType} from "../../Field/UI/FieldUIConfiguration";
import {FieldEvents} from "../../Event/DefaultEvents";
import {FieldConfigurationTestUtils} from "../../TestingUtils/FieldConfigurationTestUtils";

Enzyme.configure({adapter: new Adapter()});

const testUtils = new FieldConfigurationTestUtils<FieldValidationConfiguration, FieldValidation>("validation",
    field => new FieldValidation(field, "validation")
);

describe('UI Event', () => {
    
    it('should use injected validator', function () {
        const validator = mock<Validator>({
            validate(): boolean | string {
                return false;
            }
        });

        const validation = testUtils.getInstance({
            validator: null
        }, {
            getProps: () => {
                return {
                    injectedValidator: validator
                }
            },
            value: () => mock<FieldValue>()
        });

        const valid = validation.validate();
        expect(valid).toEqual(false);
    });

    it('should use passed validator over injected', function () {
        const validator = mock<Validator>({
            validate(): boolean | string {
                return false;
            }
        });

        const validation = testUtils.getInstance({
            validator: () => validator
        }, {
            getProps: () => {
                return {
                    injectedValidator: null
                }
            },
            value: () => mock<FieldValue>()
        });

        const valid = validation.validate();
        expect(valid).toEqual(false);
    });

    it('should skip return true when skip validation set to true', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return false;
            }
        });
        const validation = testUtils.getInstance({validator: () => injectedValidator, skipValidation: true});
        expect(validation.validate()).toEqual(true);
        expect(validation.validateWithEffect()).toEqual(true);
    });

    it('should test set & get current valid state', function () {
        const afterChangeMock = jest.fn();
        testUtils.testGet("valid", true, v => v.getCurrentValidState());
        testUtils.testSet("valid", false, v => v.set(false, afterChangeMock), {}, afterChangeMock);
    });

    it('should return true only when validation result is true or empty string', function () {
        const validator = mock<Validator>({
            validate(value: any): boolean | string {
                if (value === 'x') return true;
                if (value === 'y') return '';
                return 'error';
            }
        });

        const makeValidation = (value: any) => testUtils.getInstance({validator: () => validator}, {
            value: () => mock<IFieldValue>({
                get(): any {
                    return value;
                }
            })
        });

        let validation = makeValidation("x");
        expect(validation.validate()).toEqual(true);
        expect(validation.validateWithEffect(false)).toEqual(true);

        validation = makeValidation("y");
        expect(validation.validate()).toEqual(true);
        expect(validation.validateWithEffect(false)).toEqual(true);

        validation = makeValidation("z");
        expect(validation.validate()).toEqual(false);
        expect(validation.validateWithEffect(false)).toEqual(false);
    });

    it('should validate with effect', function () {


        const injectedValidator = mock<Validator>({
            validate(value: any): boolean | string {
                return value === 'ali';
            }
        });

        const updateConfigurationMock = jest.fn();

        const initialConfiguration = {
            valid: true,
            validator: () => injectedValidator
        };

        const makeValidation = (value: any) => testUtils.getInstance(initialConfiguration, {
            updateConfiguration: updateConfigurationMock,
            value: () => mock<IFieldValue>({
                get(): any {
                    return value;
                }
            })
        });

        let validation = makeValidation("test");
        validation.validateWithEffect(false);
        expect(updateConfigurationMock).toBeCalledWith("validation", {
            ...initialConfiguration,
            valid: false
        }, undefined);
        validation = makeValidation("ali");
        validation.validateWithEffect(false);
        expect(updateConfigurationMock).toBeCalledWith("validation", {...initialConfiguration, valid: true}, undefined);
    });

    it('should update message', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return 'error';
            }
        });
        const updateUiMock = jest.fn();
        const validation = testUtils.getInstance({
            updateMessageOnValidationFail: true,
            onFailMessageType: FieldMessageType.WARNING,
            validator: () => injectedValidator
        }, {
            value: () => mock<IFieldValue>(),
            ui: () => mock<IFieldUI>({
                update: updateUiMock
            }),
        });

        validation.validateWithEffect(false);
        expect(updateUiMock.mock.calls).toEqual([
            ["message", "error"],
            ["messageType", FieldMessageType.WARNING]
        ]);

    });

    it('should emit validation fail event on validation fail', function () {
        const injectedValidator = mock<Validator>({
            validate(): boolean | string {
                return 'error';
            }
        });
        const eventMock = mock<IFieldEvent>();
        const validation = testUtils.getInstance({
            updateMessageOnValidationFail: true,
            onFailMessageType: FieldMessageType.WARNING,
            validator: () => injectedValidator
        }, {
            event: () => eventMock,
            value: () => mock<IFieldValue>(),
            ui: () => mock<IFieldUI>(),
        });
        validation.validateWithEffect(true);
        expect(eventMock.emitOnThis).toBeCalledWith(FieldEvents.VALIDATION_FAIL, {validationResult: 'error'});
    });

});