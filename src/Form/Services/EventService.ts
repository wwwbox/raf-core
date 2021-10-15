import {Service} from '@autofiy/autofiyable';
import {EventCallback} from "../../Event/EventType";
import {IForm} from "../IForm";
import {IEventNameMaker} from "../../Event/IEventNameMaker";
import {GlobalEvents} from "../../Event/DefaultEvents";
import {IField} from "../../Field/IField";

export interface EventService extends Service {
    emit(eventName: string, payload: any): void;

    addListener(listenerId: string, eventId: string, callback: EventCallback): void;

    removeListener(id: string, eventName: string): void;

    hasListener(id: string, eventName: string): boolean;

    getNameMaker(): IEventNameMaker;
}

export type ListenerPoll = {
    [eventId: string]: {
        listenerId: string;
        callback: EventCallback
    }[];
}

export class DefaultEventService implements EventService {


    private readonly form: IForm;
    private readonly listeners: ListenerPoll;

    constructor(form: IForm) {
        this.form = form;
        this.listeners = {};
    }

    addListener(listenerId: string, eventId: string, callback: EventCallback): void {
        if (this.listeners[eventId] === undefined) {
            this.listeners[eventId] = [];
        }

        if (this.hasListener(listenerId, eventId)) {
            throw Error(`cannot listener on ${eventId}, because the id (${listenerId}) already exists`);
        }

        this.listeners[eventId].push({listenerId: listenerId, callback: callback});
    }

    removeListener(id: string, eventName: string): void {
        if (this.hasListener(id, eventName)) {
            const index = this.indexOfId(id, eventName);
            this.listeners[eventName].splice(index, 1);
        }
    }

    emit(eventName: string, payload: any): void {
        const listeners = this.listeners[eventName] ?? [];
        listeners.forEach(listener => {
            listener.callback(this.form, payload);
        });
        this.sendOnAnyValueChangeIfFieldChanged(eventName, payload);
    }

    hasListener(id: string, eventName: string): boolean {
        for (let listener of this.listeners[eventName]) {
            if (listener.listenerId === id) {
                return true;
            }
        }
        return false;
    }

    getNameMaker(): IEventNameMaker {
        return this.form.getServiceProvider().getService<IEventNameMaker>("eventNameMaker");
    }

    private sendOnAnyValueChangeIfFieldChanged(eventName: string, payload: any) {
        const onAnyValueChanged = this.form.getProps().onAnyValueChanged;
        if (eventName === GlobalEvents.VALUE_CHANGED && onAnyValueChanged) {
            const field: IField = payload.field;
            onAnyValueChanged(field.getName(), field.valueService().get(), field, this.form);
        }
    }

    private indexOfId(id: string, eventName: string): number {
        for (let i = 0; i < this.listeners[eventName].length; i++) {
            let listener = this.listeners[eventName][i];
            if (listener.listenerId === id) {
                return i;
            }
        }
        return -1;
    }

}