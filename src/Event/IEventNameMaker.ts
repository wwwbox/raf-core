import IField from "../Field/IField";

export interface IEventNameMaker {
    fieldEvent(field: IField, eventName: string): string;
}


export class DefaultEventNameMaker implements IEventNameMaker {
    fieldEvent(field: IField, eventName: string): string {
        return `EF@${field.getName()}?${eventName}`;
    }
}