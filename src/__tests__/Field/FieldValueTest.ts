import {FieldValue} from "../../Field/Value/FieldValue";
import IField from "../../Field/IField";
import {mock} from "jest-mock-extended";
import {FieldValueConfiguration, getDefaultFieldValueConfiguration} from "../../Field/Value/FieldValueConfiguration";
import IForm from "../../Form/IForm";
import {EventService} from "../../Form/Services/EventService";
import {IFieldEvent} from "../../Field/FieldEvent/FieldEvent";
import {FieldConfigurationTestUtils} from "../../TestingUtils/FieldConfigurationTestUtils";
import {IFieldValidation} from "../../Field/Validation/FieldValidation";


const testUtils = new FieldConfigurationTestUtils<FieldValueConfiguration, FieldValue>("value",
    field => new FieldValue(field, "value")
);

describe('FieldValue', () => {

    const field: IField = mock<IField>();
    field.event = jest.fn().mockReturnValue(mock<IFieldEvent>());
    field.getConfiguration = jest.fn().mockReturnValue({
        ...getDefaultFieldValueConfiguration(),
        extractValueFromEvent: (e: any) => e.target.value
    });
    field.getForm = () => mock<IForm>({
        eventService(): EventService {
            return mock<EventService>()
        }
    })

    function getFieldValueInstance(): FieldValue {
        return new FieldValue(field, "value");
    }

    it('should extract value from event', function () {
        const value = getFieldValueInstance();
        const x = value.extractFromEvent({target: {value: 'x'}});
        expect(x).toEqual('x');
    });

    it('should get on change handler from passed options', function () {
        const valueChangeHandlerMock = jest.fn();
        const {service: value, field} = testUtils.getInstanceWithField({}, {
            getProps: () => ({valueChangeHandler: valueChangeHandlerMock})
        })
        value.getOnChangeHandler();
        expect(valueChangeHandlerMock).toBeCalledWith(field);
    });

    it('should get default change handler', function () {
        const valueChangeHandlerMock = jest.fn();
        const {service: value, field} = testUtils.getInstanceWithField({defaultChangeHandler: valueChangeHandlerMock}, {
            getProps: () => ({valueChangeHandler: null})
        });
        value.getOnChangeHandler();
        expect(valueChangeHandlerMock).toBeCalledWith(field);
    });

    it('should set value', function () {
        const updateConfigurationMock = jest.fn((_, __, afterChange) => {
            afterChange?.();
        });
        const validationMock = mock<IFieldValidation>();
        const value = testUtils.getInstance({}, {
            updateConfiguration: updateConfigurationMock,
            validation: () => validationMock
        })
        const callback = jest.fn();
        value.set('x', true, callback);
        expect(updateConfigurationMock).toBeCalledWith('value', {value: 'x'}, expect.any(Function));
        expect(callback).toBeCalled();
        expect(validationMock.validateWithEffect).toBeCalledWith(true);
    });


    it('should get value', function () {
        testUtils.testGet("value", "test", v => v.get());
    });

    it('should clear value', function () {
        const updateConfigurationMock = jest.fn();
        const value = testUtils.getInstance({clearValue: 'empty'}, {
            updateConfiguration: updateConfigurationMock
        });
        value.clear();
        expect(updateConfigurationMock).toBeCalledWith('value', {
            clearValue: 'empty',
            value: 'empty'
        }, expect.any(Function));
    });

    it('should not update valueChangeHandler,defaultChangeHandler', function () {
        testUtils.testUnupdatableConfiguration('valueChangeHandler', 'defaultChangeHandler');
    });

})