import IField from "../../Field/IField";
import * as React from "react";
import IForm from "../../Form/IForm";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {mock} from "jest-mock-extended";
import {FieldEvent} from "../../Field/FieldEvent/FieldEvent";
import {IEventNameMaker} from "../../Event/IEventNameMaker";


describe('FieldEvent', () => {

    const FIELD_NAME = "field";

    function getInstance() {
        const formEvent = mock<IFormEvent>();
        const form = mock<IForm>({
            event(): IFormEvent {
                return formEvent
            }
        });
        const field = mock<IField>({
            getForm(): IForm {
                return form;
            },
            getName(): string {
                return FIELD_NAME;
            },
            getProps(): any {
                return {
                    injectedEventNameMaker: mock<IEventNameMaker>({
                        fieldEvent(field: IField, eventName: string): string {
                            return eventName + field.getName();
                        }
                    })
                }
            }
        });
        const event = new FieldEvent(field);
        return {event, formEvent, field};
    }


    it('should listen on event', function () {
        const {formEvent, event} = getInstance();
        const callback = jest.fn();
        const eventName = 'SOME_EVENT';
        event.listen(eventName, callback);
        expect(formEvent.addListener).toBeCalledWith(FIELD_NAME, eventName, callback);
    });

    it('should listenThis on event', function () {
        const callback = jest.fn();
        const eventName = 'SOME_EVENT';
        const {event, formEvent} = getInstance();
        event.listenOnThis(eventName, callback);
        expect(formEvent.addListener).toBeCalledWith(FIELD_NAME, eventName + FIELD_NAME, callback);
    });

    it('should remove listener', function () {
        const eventName = 'SOME_EVENT';
        const {event, formEvent} = getInstance();
        event.removeListener(eventName);
        expect(formEvent.removeListener).toBeCalledWith(FIELD_NAME, eventName);
    });

    it('should remove listener OnThis', function () {
        const eventName = 'SOME_EVENT';
        const {event, formEvent} = getInstance();
        event.removeListenerOnThis(eventName);
        expect(formEvent.removeListener).toBeCalledWith(FIELD_NAME, eventName + FIELD_NAME);
    });

    it('should emit event', function () {
        const {event, formEvent, field} = getInstance();
        const eventName = 'EVENT_NAME';
        const payload = {test: true};
        event.emit(eventName, payload);
        expect(formEvent.emit).toBeCalledWith(eventName, {__source: field, test: true});
    });

    it('should emit event onThis', function () {
        const {event, formEvent, field} = getInstance();
        const eventName = 'EVENT_NAME';
        const payload = {test: true};
        event.emitOnThis(eventName, payload);
        expect(formEvent.emit).toBeCalledWith(eventName + FIELD_NAME, {__source: field, test: true});
    });

    it('should make event name', function () {
        const {event} = getInstance();
        const eventName = "EVENT_NAME";
        const name = event.makeEventName(eventName);
        expect(name).toEqual(eventName + FIELD_NAME);
    });
})
