import { Service } from '@autofiy/autofiyable';
import { EventCallback } from "../../Event/EventType";
import IForm from "../IForm";
import { IEventNameMaker } from "../../Event/IEventNameMaker";
import { GlobalEvents } from "../../Event/DefaultEvents";
import IField from "../../Field/IField";

export interface IFormEvent extends Service {
    emit(eventName: string, payload: any): void;

    addListener(id: string, eventName: string, callback: EventCallback): void;

    removeListener(id: string, eventName: string): void;

    hasListener(id: string, eventName: string): boolean;

    getNameMaker(): IEventNameMaker;
}

export type ListenerPoll = {
    [eventName: string]: {
        id: string;
        callback: EventCallback
    }[];
}

export class FormEvent implements IFormEvent {


    private readonly form: IForm;
    private readonly listeners: ListenerPoll;

    constructor(form: IForm) {
        this.form = form;
        this.listeners = {};
    }

    addListener(id: string, eventName: string, callback: EventCallback): void {
        if (this.listeners[eventName] === undefined) {
            this.listeners[eventName] = [];
        }

        if (this.hasListener(id, eventName)) {
            throw Error(`cannot listener on ${eventName}, because the id (${id}) already exists`);
        }

        this.listeners[eventName].push({ id: id, callback: callback });
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

    private sendOnAnyValueChangeIfFieldChanged(eventName: string, payload: any) {
        const onAnyValueChanged = this.form.getProps().onAnyValueChanged;
        if (eventName === GlobalEvents.VALUE_CHANGED && onAnyValueChanged) {
            const field: IField = payload.field;
            onAnyValueChanged(field.getName(), field.value().get(), field, this.form);
        }
    }

    hasListener(id: string, eventName: string): boolean {
        for (let listener of this.listeners[eventName]) {
            if (listener.id === id) {
                return true;
            }
        }
        return false;
    }

    private indexOfId(id: string, eventName: string): number {
        for (let i = 0; i < this.listeners[eventName].length; i++) {
            let listener = this.listeners[eventName][i];
            if (listener.id === id) {
                return i;
            }
        }
        return -1;
    }

    getNameMaker(): IEventNameMaker {
        return this.form.getServiceProvider().getService<IEventNameMaker>("eventNameMaker");
    }

}