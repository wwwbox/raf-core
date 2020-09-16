import IField from "../Field/IField";

export interface IEventNameMaker {
    fieldEvent(field: IField, eventName: string): string;

    globalEvent(eventName: string): string;
}