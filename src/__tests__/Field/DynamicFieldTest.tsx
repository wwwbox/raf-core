import DynamicField from "../../Field/Concrete/DynamicField";
import {FieldType} from "../../Field/Concrete/FieldType";
import Enzyme, {mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import DefaultDynamicFieldChangeHandler from "../../ChangeHandler/DefaultDynamicFieldChangeHandler";
import {EventService} from "../../Form/Services/EventService";
import {mock} from "jest-mock-extended";
import {IEventNameMaker} from "../../Event/IEventNameMaker";

Enzyme.configure({adapter: new Adapter()});


describe('DynamicField', () => {

    const FIELD_NAME = "field";
    const FIELD_AS: any = 'div';

    function getField(otherProps: any = {}, value?: any) {
        const props = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: mock<IEventNameMaker>(),
            injectedValidator: {} as any,
            value: value,
            extra: {
                ...otherProps
            },
            form: {fieldsManager: jest.fn().mockReturnValue({register: jest.fn()}), event: mock<EventService>()} as any
        };
        const component = mount(<DynamicField  {...props} />);
        return component.instance() as DynamicField;
    }

    it('should return DynamicField as type', function () {
        const field = getField();
        expect(field.getType()).toEqual(FieldType.DYNAMIC);
    });

    it('should start with one value when no default value supplied', function () {
        const field = getField();
        const value = field.valueService().get();
        expect(value).toEqual(['']);
    });

    it('should return default value when supplied', function () {
        const field = getField({}, ['1', '2']);
        const value = field.valueService().get();
        expect(value).toEqual(['1', '2']);
    });

    it('should add new input', function () {
        const field = getField();
        field.addInput('test');
        const value = field.valueService().get();
        expect(value).toEqual(['', 'test']);
    });

    it('should remove input', function () {
        const field = getField();
        field.addInput('test');
        field.addInput('other');
        field.removeInput(1);
        let value = field.valueService().get();
        expect(value).toEqual(['', 'other']);
        field.removeInput(1);
        value = field.valueService().get();
        expect(value).toEqual(['']);
    });

    it('should use default dynamic change handler', function () {
        const field = getField();
        const changeHandler = field.valueService().getOnChangeHandler();
        expect(changeHandler).toBeInstanceOf(DefaultDynamicFieldChangeHandler);
    });

    it('should not add when max input exceeded', function () {
        const onMaxInputExceed = jest.fn();
        const field = getField({maxInput: 2, onMaxInputExceed: onMaxInputExceed});
        field.addInput();
        expect(field.valueService().get()).toHaveLength(2);
        field.addInput();
        expect(field.valueService().get()).toHaveLength(2);
        expect(onMaxInputExceed).toBeCalledWith(field);
    });

    it('should call when input filled', function () {
        const onInputFilled = jest.fn();
        const field = getField({maxInput: 3, onInputFilled: onInputFilled});
        field.addInput();
        field.addInput();
        expect(onInputFilled).toBeCalledTimes(1);
        expect(onInputFilled).toBeCalledWith(field);
    });

    it('should call onItemAdded,onItemRemoved callbacks', function () {
        const onItemRemoved = jest.fn();
        const onItemAdded = jest.fn();
        const field = getField({onItemRemoved: onItemRemoved, onItemAdded: onItemAdded});
        field.addInput('test');
        expect(onItemAdded).toBeCalledWith(1, field);
        field.removeInput(1);
        expect(onItemRemoved).toBeCalledWith('test', 1, field)

    });

});