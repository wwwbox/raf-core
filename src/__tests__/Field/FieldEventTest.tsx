import IField from "../../Field/IField";
import {FieldProps} from "../../Field/FieldProps";
import Enzyme, {mount} from "enzyme";
import Field from "../../Field/Concrete/Field";
import * as React from "react";
import IForm from "../../Form/IForm";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {mock} from "jest-mock-extended";
import {FieldEvent} from "../../Field/FieldEvent/FieldEvent";
import {IEventNameMaker} from "../../Event/IEventNameMaker";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});


describe('FieldEvent', () => {

    const FIELD_NAME = "field";
    const FIELD_AS: any = 'div';

    let field: IField;
    let form: IForm;

    function getFieldEvent(eventNameMaker: IEventNameMaker) {

        const formEvent = mock<IFormEvent>();

        const props: FieldProps = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: eventNameMaker,
            injectedValidator: {} as any,
            form: {
                fields: jest.fn().mockReturnValue({register: jest.fn()}),
                event: jest.fn().mockReturnValue(jest.fn()).mockReturnValue(formEvent)
            } as any
        };

        const component = mount(<Field  {...props} />);
        field = component.instance() as Field;
        form = field.getForm();

        return new FieldEvent(field);
    }


    it('should listen on event', function () {
        const fieldEvent = getFieldEvent({} as any);
        const callback = jest.fn();
        const eventName = 'SOME_EVENT';
        fieldEvent.listen(eventName, callback);
        expect(form.event().addListener).toBeCalledWith(FIELD_NAME, eventName, callback);
    });

    it('should listenThis on event', function () {
        const id = "xyz";
        const callback = jest.fn();
        const eventName = 'SOME_EVENT';
        const nameMaker = mock<IEventNameMaker>({
            fieldEvent(field: IField, eventName: string): string {
                return eventName + id;
            }
        });
        const fieldEvent = getFieldEvent(nameMaker);
        fieldEvent.listenOnThis(eventName, callback);
        expect(form.event().addListener).toBeCalledWith(FIELD_NAME, eventName + id, callback);
    });

    it('should remove listener', function () {
        const eventName = 'SOME_EVENT';
        const fieldEvent = getFieldEvent(mock<IEventNameMaker>());
        fieldEvent.removeListener(eventName);
        expect(form.event().removeListener).toBeCalledWith(FIELD_NAME, eventName);
    });

    it('should remove listener OnThis', function () {
        const id = "xyz";
        const eventName = 'SOME_EVENT';
        const nameMaker = mock<IEventNameMaker>({
            fieldEvent(field: IField, eventName: string): string {
                return eventName + id;
            }
        });
        const fieldEvent = getFieldEvent(nameMaker);
        fieldEvent.removeListenerOnThis(eventName);
        expect(form.event().removeListener).toBeCalledWith(FIELD_NAME, eventName + id);
    });

    it('should emit event', function () {
        const event = getFieldEvent(mock<IEventNameMaker>());
        const eventName = 'EVENT_NAME';
        const payload = {test: true};
        event.emit(eventName, payload);

        expect(form.event().emit).toBeCalledWith(eventName, {__source: field, test: true});
    });

    it('should emit event onThis', function () {
        const id = "xyz";
        let eventNameMaker = mock<IEventNameMaker>({
            fieldEvent(field: IField, eventName: string): string {
                return eventName + id;
            }
        });
        const event = getFieldEvent(eventNameMaker);
        const eventName = 'EVENT_NAME';
        const payload = {test: true};
        event.emitOnThis(eventName, payload);

        expect(form.event().emit).toBeCalledWith(eventName + id, {__source: field, test: true});
    });

    it('should make event name', function () {
        let eventNameMaker = mock<IEventNameMaker>({
            fieldEvent(): string {
                return "test";
            }
        });
        const event = getFieldEvent(eventNameMaker);
        const eventName = "EVENT_NAME";
        const name = event.makeEventName(eventName);
        expect(name).toEqual("test");
    });
})
