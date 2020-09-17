import IField from "../Field/IField";

export interface IEventNameMaker {
    fieldEvent(field: IField, eventName: string): string;

    globalEvent(eventName: string): string;
}


export class DefaultEventNameMaker implements IEventNameMaker {
    fieldEvent(field: IField, eventName: string): string {
        return `EF@${field.getName()}?${eventName}`;
    }

    globalEvent(eventName: string): string {
        return `FG@${eventName}`;
    }
}