import {FormValue} from "../../Form/FormValue/FormValue";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {IFieldValue} from "../../Field/Value/FieldValue";
import {IFieldCollecting} from "../../Field/Collecting/FieldCollecting";
import {tfGetForm} from "../../TestingUtils/TestingFormUtils";

describe('FormValueTest', () => {



    it('should clear value', function () {
        const fieldValueMock = mock<IFieldValue>();
        const fields = [
            mock<IField>({
                value(): IFieldValue {
                    return fieldValueMock
                }
            }),
            mock<IField>({
                value(): IFieldValue {
                    return fieldValueMock
                }
            }),
            mock<IField>({
                value(): IFieldValue {
                    return fieldValueMock
                }
            }),
        ];
        const value = new FormValue(tfGetForm(fields));
        value.clear();
        expect(fieldValueMock.clear).toBeCalledTimes(3);
    });

    it('should return isReady', function () {
        const filedCollectingMock = mock<IFieldCollecting>({
            isReady: jest.fn().mockReturnValue(true)
        });
        const fields = [
            mock<IField>({
                collecting(): IFieldCollecting {
                    return filedCollectingMock;
                }
            }),
            mock<IField>({
                collecting(): IFieldCollecting {
                    return filedCollectingMock;
                }
            }),
            mock<IField>({
                collecting(): IFieldCollecting {
                    return filedCollectingMock;
                }
            }),
        ];

        const value = new FormValue(tfGetForm(fields));
        const isReady = value.isReady();
        expect(isReady).toEqual(true);
        expect(filedCollectingMock.isReady).toBeCalledTimes(3);
    });

    it('should set values', function () {
        const field1ValueMock = mock<IFieldValue>({
            set: jest.fn(),
        });
        const field2ValueMock = mock<IFieldValue>({
            set: jest.fn()
        });
        const field3ValueMock = mock<IFieldValue>({
            set: jest.fn()
        });
        const fields = [
            mock<IField>({
                value(): IFieldValue {
                    return field1ValueMock
                },
                getName(): string {
                    return "x";
                }
            }),
            mock<IField>({
                value(): IFieldValue {
                    return field2ValueMock
                },
                getName(): string {
                    return "y";
                }
            }),
            mock<IField>({
                value(): IFieldValue {
                    return field3ValueMock
                },
                getName(): string {
                    return "z";
                }
            }),
        ];


        const value = new FormValue(tfGetForm(fields));
        value.set({x: '1', y: '2', a: '3'});
        expect(field1ValueMock.set).toBeCalledWith('1');
        expect(field1ValueMock.set).toBeCalledTimes(1);
        expect(field2ValueMock.set).toBeCalledWith('2');
        expect(field2ValueMock.set).toBeCalledTimes(1);
        expect(field3ValueMock.set).not.toBeCalled();
    });

});