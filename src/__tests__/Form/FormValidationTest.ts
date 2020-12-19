import { ServiceProvider } from '@autofiy/autofiyable';
import {IFieldValidation} from "../../Field/Validation/FieldValidation";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {FormValidation} from "../../Form/FormValidation/FormValidation";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {GlobalEvents} from "../../Event/DefaultEvents";
import FormProps from "../../Form/FormProps";
import {NotEmptyValidator} from "../../Defaults/Services/Validator";
import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {FieldType} from "../../Field/Concrete/FieldType";

describe('FormValidation', () => {

    function createField(mockedValidate: any, mockedValidateWithEffect: any = undefined): IField {
        return FormTestUtils.createMockedField('X', FieldType.NORMAL, {
            validation: () => mock<IFieldValidation>({
                validate: mockedValidate,
                validateWithEffect: mockedValidateWithEffect,
            })
        })
    }

    it('should validate inputs', function () {

        const mockedValidate = jest.fn().mockReturnValue(true);
        const fields = [
            createField(mockedValidate),
            createField(mockedValidate),
            createField(mockedValidate),
        ];
        const validation = new FormValidation(FormTestUtils.makeForm(fields));
        const isValid = validation.validate();
        expect(isValid).toEqual(true);
        expect(mockedValidate).toBeCalledTimes(3);
    });

    it('should validate with effect inputs', function () {
        const mockedValidate = jest.fn().mockReturnValue(true);
        const fields = [createField(undefined, mockedValidate), createField(undefined, mockedValidate)];
        const validation = new FormValidation(FormTestUtils.makeForm(fields, {
            event: () => mock<IFormEvent>()
        }));
        const isValid = validation.validateWithEffect();
        expect(isValid).toEqual(true);
        expect(mockedValidate).toBeCalledTimes(2);
        expect(mockedValidate).toBeCalledWith(false);
    });

    it('should emit validation fail event when validation fail', function () {
        const mockedValidate = jest.fn().mockReturnValue(false);
        const fields = [createField(undefined, mockedValidate)];
        const event = mock<IFormEvent>();
        const validation = new FormValidation(FormTestUtils.makeForm(fields, {
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
        const validation = new FormValidation(FormTestUtils.makeForm([], {
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
        const validation = new FormValidation(FormTestUtils.makeForm([], {
            getProps: (): Partial<FormProps> => {
                return {
                    services: {}
                }
            }
        }));

        expect(validation.getValidator()).toBeInstanceOf(NotEmptyValidator);
    });

});