import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Field from "../../Field/Concrete/Field";
import * as React from "react";
import {FieldProps} from "../../Field/FieldProps";
import FieldStateInitializer, {DefaultExtraConfigurationInitializer} from "../../Field/Concrete/FieldStateInitializer";
import {FieldType} from "../../Field/Concrete/FieldType";

Enzyme.configure({adapter: new Adapter()});

describe('Field', () => {

    const FIELD_NAME = "field";
    const FIELD_AS: any = 'div';

    let field: Field;
    let props: FieldProps;
    let component: any;

    beforeEach(() => {
        props = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: {} as any,
            injectedValidator: {} as any,
            form: {fields: jest.fn().mockReturnValue({register: jest.fn()})} as any
        };
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
    });

    it('should register the field in the form', function () {
        expect(props.form.fields().register).toBeCalledWith(field);
    });

    it('should initialize state', function () {
        const state = new FieldStateInitializer(field.props, new DefaultExtraConfigurationInitializer()).initialize();
        expect(state).toEqual(field.state);
    });

    it('should return the type', function () {
        expect(field.getType()).toEqual(FieldType.NORMAL);
    });

    it('should return configuration', function () {
        expect(field.getConfiguration("collecting")).toEqual(field.state.collecting);
        expect(field.getConfiguration("extra")).toEqual(field.state.extra);
        expect(field.getConfiguration("ui")).toEqual(field.state.ui);
        expect(field.getConfiguration("validation")).toEqual(field.state.validation);
        expect(field.getConfiguration("value")).toEqual(field.state.value);
    });

    it('should update configuration', function () {
        const state = {...field.state};
        const afterChange = jest.fn();
        field.updateConfiguration<any>("extra", {test: true}, afterChange);
        state.extra = {test: true};
        expect(state).toEqual(field.state);
        expect(afterChange).toBeCalled();
    });

    it('should return the name', function () {
        expect(field.getName()).toEqual(FIELD_NAME);
    });
});
