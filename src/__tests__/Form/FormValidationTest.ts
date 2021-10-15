import {FieldValidator} from "../../Field/Service/FieldValidator";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {DefaultFormValidator} from "../../Form/Services/FormValidator";
import {EventService} from "../../Form/Services/EventService";
import {GlobalEvents} from "../../Event/DefaultEvents";
import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {FieldType} from "../../Field/FieldType";

describe('FormValidation', () => {

    function createField(mockedValidate: any, mockedValidateWithEffect: any = undefined): IField {
        return FormTestUtils.createMockedField('X', FieldType.NORMAL, {
            validator: () => mock<FieldValidator>({
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
        const validation = new DefaultFormValidator(FormTestUtils.makeForm(fields));
        const isValid = validation.validate();
        expect(isValid).toEqual(true);
        expect(mockedValidate).toBeCalledTimes(3);
    });

    it('should validate with effect inputs', function () {
        const mockedValidate = jest.fn().mockReturnValue(true);
        const fields = [createField(undefined, mockedValidate), createField(undefined, mockedValidate)];
        const validation = new DefaultFormValidator(FormTestUtils.makeForm(fields, {
            eventService: () => mock<EventService>()
        }));
        const isValid = validation.validateWithEffect();
        expect(isValid).toEqual(true);
        expect(mockedValidate).toBeCalledTimes(2);
        expect(mockedValidate).toBeCalledWith(false);
    });

    it('should emit validation fail event when validation fail', function () {
        const mockedValidate = jest.fn().mockReturnValue(false);
        const fields = [createField(undefined, mockedValidate)];
        const event = mock<EventService>();
        const validation = new DefaultFormValidator(FormTestUtils.makeForm(fields, {
            eventService: () => {
                return event;
            }
        }));
        const isValid = validation.validateWithEffect();
        expect(isValid).toEqual(false);
        expect(event.emit).toBeCalledWith(GlobalEvents.VALIDATION_FAIL, {});

    });

});