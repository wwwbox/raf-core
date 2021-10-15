import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Field from "../../Field/Field";
import * as React from "react";
import {FieldProps} from "../../Field/FieldProps";
import FieldStateInitializer, {DefaultExtraConfigurationInitializer} from "../../Field/Concrete/FieldStateInitializer";
import {FieldType} from "../../Field/Concrete/FieldType";
import {EventService} from "../../Form/Services/EventService";
import {FieldEvents} from "../../Event/DefaultEvents";
import {DefaultEventNameMaker} from "../../Event/IEventNameMaker";
import {mock} from "jest-mock-extended";

Enzyme.configure({adapter: new Adapter()});

describe('Field', () => {

    const FIELD_NAME = "field";
    const FIELD_AS: any = 'div';

    const nameMaker = new DefaultEventNameMaker();
    let field: Field;
    let props: FieldProps;
    let component: any;
    let formEvent: any;

    const formReadyMock = jest.fn();
    const formClearedMock = jest.fn();
    const fieldChangedMock = jest.fn();

    beforeEach(() => {
        formEvent = mock<EventService>();
        props = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: nameMaker,
            injectedValidator: {} as any,
            listenThis: {
                [FieldEvents.CHANGE]: fieldChangedMock
            },
            form: {
                fieldsManager: jest.fn().mockReturnValue({register: jest.fn()}),
                eventService: () => formEvent
            } as any
        };
        component = mount(<Field  {...props} />);
        field = component.instance() as Field;
    });

    it('should register the field in the form', function () {
        expect(props.form.fieldsManager().register).toBeCalledWith(field);
    });

    it('should initialize state', function () {
        const state = new FieldStateInitializer(field.props, new DefaultExtraConfigurationInitializer()).initialize();
        expect(JSON.stringify(state)).toEqual(JSON.stringify(field.state));
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

    it('should register listeners', function () {
        expect(formEvent.addListener.mock.calls).toEqual([
            [FIELD_NAME, `EF@${FIELD_NAME}?${FieldEvents.CHANGE}`, fieldChangedMock],
        ])
    });
});
