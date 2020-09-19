import {FieldValue} from "../../Field/Value/FieldValue";
import IField from "../../Field/IField";
import {mock} from "jest-mock-extended";
import {getDefaultFieldValueConfiguration} from "../../Field/Value/FieldValueConfiguration";

describe('FieldValue', () => {

    const field: IField = mock<IField>();
    field.getConfiguration = jest.fn().mockReturnValue(getDefaultFieldValueConfiguration());

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
        field.getProps = jest.fn().mockReturnValue({valueChangeHandler: valueChangeHandlerMock});
        const value = getFieldValueInstance();
        value.getOnChangeHandler();
        expect(valueChangeHandlerMock).toBeCalledWith(field);
    });

    it('should get on change handler from configuration', function () {
        const valueChangeHandlerMock = jest.fn();
        field.getProps = jest.fn().mockReturnValue({valueChangeHandler: null});
        field.getConfiguration = jest.fn().mockReturnValue({defaultChangeHandler: valueChangeHandlerMock});
        const value = getFieldValueInstance();
        value.getOnChangeHandler();
        expect(valueChangeHandlerMock).toBeCalledWith(field);
    });

    it('should set value', function () {
        const value = getFieldValueInstance();
        const callback = jest.fn();
        field.getConfiguration = jest.fn().mockReturnValue({});
        value.set('x', true, callback);
        expect(field.updateConfiguration).toBeCalledWith('value', {value: 'x'}, callback);
    });


    it('should get value', function () {
        const value = getFieldValueInstance();
        field.getConfiguration = jest.fn().mockReturnValue({value: 'x'});
        const x = value.get();
        expect(x).toEqual('x');
    });

    it('should clear value', function () {
        const value = getFieldValueInstance();
        field.getConfiguration = jest.fn().mockReturnValue({clearValue: 'empty'});
        value.clear();
        expect(field.updateConfiguration).toBeCalledWith('value', {clearValue: 'empty', value: 'empty'}, undefined);
    });

    it('should not update valueChangeHandler,defaultChangeHandler', function () {
        const value = getFieldValueInstance();
        expect(() => value.update('valueChangeHandler', {})).toThrowError();
        expect(() => value.update('defaultChangeHandler', {})).toThrowError();
    });

})