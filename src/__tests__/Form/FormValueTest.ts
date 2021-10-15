import {DefaultFormValueService} from "../../Form/Services/FormValueService";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {FieldValueService} from "../../Field/Service/FieldValueService";
import {IFieldCollecting} from "../../Field/Collecting/FieldCollecting";
import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {FieldType} from "../../Field/Concrete/FieldType";
import {EventService} from "../../Form/Services/EventService";
import {GlobalEvents} from "../../Event/DefaultEvents";

describe('FormValueTest', () => {

    function createField(value?: FieldValueService, collecting?: IFieldCollecting, name: string = 'X'): IField {
        return FormTestUtils.createMockedField('X', FieldType.NORMAL, {
            valueService: () => value,
            collecting: () => collecting,
            getName: () => name,
        });
    }


    it('should clear value', function () {
        const fieldValueMock = mock<FieldValueService>();
        const fields = [createField(fieldValueMock), createField(fieldValueMock), createField(fieldValueMock)];
        const mockedEvent = mock<EventService>();
        const value = new DefaultFormValueService(FormTestUtils.makeForm(fields, {
            eventService: () => mockedEvent
        }));
        value.clear();
        expect(fieldValueMock.clear).toBeCalledTimes(3);
        expect(mockedEvent.emit).toBeCalledWith(GlobalEvents.FORM_CLEARED, {});
    });

    it('should return isReady', function () {
        const collectingMock = mock<IFieldCollecting>({
            isReady: jest.fn().mockReturnValue(true)
        });
        const fields = [
            createField(undefined, collectingMock),
            createField(undefined, collectingMock),
            createField(undefined, collectingMock),
        ];

        const value = new DefaultFormValueService(FormTestUtils.makeForm(fields));
        const isReady = value.isReady();
        expect(isReady).toEqual(true);
        expect(collectingMock.isReady).toBeCalledTimes(3);
    });

    it('should set values', function () {
        const field1ValueMock = mock<FieldValueService>({
            set: jest.fn(),
        });
        const field2ValueMock = mock<FieldValueService>({
            set: jest.fn()
        });
        const field3ValueMock = mock<FieldValueService>({
            set: jest.fn()
        });
        const fields = [
            createField(field1ValueMock, undefined, 'x'),
            createField(field2ValueMock, undefined, 'y'),
            createField(field3ValueMock, undefined, 'z'),
        ];


        const value = new DefaultFormValueService(FormTestUtils.makeForm(fields));
        value.set({x: '1', y: '2', a: '3'});
        expect(field1ValueMock.set).toBeCalledWith('1');
        expect(field1ValueMock.set).toBeCalledTimes(1);
        expect(field2ValueMock.set).toBeCalledWith('2');
        expect(field2ValueMock.set).toBeCalledTimes(1);
        expect(field3ValueMock.set).not.toBeCalled();
    });

});