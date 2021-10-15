import {DefaultFieldValueService} from "../../Field/Service/FieldValueService";
import IField from "../../Field/IField";
import {mock} from "jest-mock-extended";
import {FieldValueConfiguration} from "../../Field/Configuration/FieldValueConfiguration";
import IForm from "../../Form/IForm";
import {EventService} from "../../Form/Services/EventService";
import {FieldEventService} from "../../Field/Service/FieldEventService";
import {FieldConfigurationTestUtils} from "../../TestingUtils/FieldConfigurationTestUtils";
import {FieldValidator} from "../../Field/Service/FieldValidator";
import {getDefaultFieldValueConfiguration} from "../../Field/Configuration/Defaults/DefaultValueConfiguration";


const testUtils = new FieldConfigurationTestUtils<FieldValueConfiguration, DefaultFieldValueService>("value",
    field => new DefaultFieldValueService(field, "value")
);

describe('FieldValue', () => {

    const field: IField = mock<IField>();
    field.eventService = jest.fn().mockReturnValue(mock<FieldEventService>());
    field.getConfiguration = jest.fn().mockReturnValue({
        ...getDefaultFieldValueConfiguration(),
        extractValueFromEvent: (e: any) => e.target.value
    });
    field.getForm = () => mock<IForm>({
        eventService(): EventService {
            return mock<EventService>()
        }
    })

    function getFieldValueInstance(): DefaultFieldValueService {
        return new DefaultFieldValueService(field, "value");
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
        const validationMock = mock<FieldValidator>();
        const value = testUtils.getInstance({}, {
            updateConfiguration: updateConfigurationMock,
            validator: () => validationMock
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