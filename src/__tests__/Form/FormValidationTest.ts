import {IFieldValidation} from "../../Field/Validation/FieldValidation";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {FormValidation} from "../../Form/FormValidation/FormValidation";
import {tfGetForm} from "../../TestingUtils/TestingFormUtils";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {GlobalEvents} from "../../Event/DefaultEvents";
import FormProps from "../../Form/FormProps";
import {NotEmptyValidator} from "../../Defaults/Services/Validator";

describe('FormValidation', () => {

    it('should validate inputs', function () {
        const fieldValidationMock = mock<IFieldValidation>({
            validate: jest.fn().mockReturnValue(true)
        });
        const fields = [
            mock<IField>({
                validation(): IFieldValidation {
                    return fieldValidationMock;
                }
            }),
            mock<IField>({
                validation(): IFieldValidation {
                    return fieldValidationMock;
                }
            }),
            mock<IField>({
                validation(): IFieldValidation {
                    return fieldValidationMock;
                }
            })
        ];
        const validation = new FormValidation(tfGetForm(fields));
        const isValid = validation.validate();
        expect(isValid).toEqual(true);
        expect(fieldValidationMock.validate).toBeCalledTimes(3);
    });

    it('should validate with effect inputs', function () {
        const validationMock = mock<IFieldValidation>({
            validateWithEffect: jest.fn().mockReturnValue(true)
        });
        const fields = [
            mock<IField>({
                validation(): IFieldValidation {
                    return validationMock;
                }
            }),
            mock<IField>({
                validation(): IFieldValidation {
                    return validationMock;
                }
            })
        ];
        const validation = new FormValidation(tfGetForm(fields));
        const isValid = validation.validateWithEffect();
        expect(isValid).toEqual(true);
        expect(validationMock.validateWithEffect).toBeCalledTimes(2);
        expect(validationMock.validateWithEffect).toBeCalledWith(false);
    });

    it('should emit validation fail event when validation fail', function () {
        const validationMock = mock<IFieldValidation>({
            validateWithEffect: jest.fn().mockReturnValue(false)
        });
        const fields = [
            mock<IField>({
                validation(): IFieldValidation {
                    return validationMock;
                }
            }),
        ];
        const event = mock<IFormEvent>();
        const validation = new FormValidation(tfGetForm(fields, {
            event: () => {
                return event;
            }
        }));
        const isValid = validation.validateWithEffect();
        expect(isValid).toEqual(false);
        expect(event.emit).toBeCalledWith(GlobalEvents.VALIDATION_FAIL, {});

    });

    it('should return validator from passed services', function () {
        const validator = () => ({}) as any;
        const validation = new FormValidation(tfGetForm([], {
            getProps: (): Partial<FormProps> => {
                return {
                    services: {
                        validator: validator
                    }
                }
            }
        }));

        expect(validation.getValidator()).toEqual(validator());
    });

    it('should return validator from defaults', function () {
        const validation = new FormValidation(tfGetForm([], {
            getProps: (): Partial<FormProps> => {
                return {
                    services: {}
                }
            }
        }));

        expect(validation.getValidator()).toBeInstanceOf(NotEmptyValidator);
    });

});