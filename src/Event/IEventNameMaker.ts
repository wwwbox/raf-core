import { IField } from "../Field/IField";
import { Service } from "@autofiy/autofiyable";

export interface IEventNameMaker extends Service {
    fieldEvent(field: IField, eventName: string): string;
}


export class DefaultEventNameMaker implements IEventNameMaker {
    fieldEvent(field: IField, eventName: string): string {
        return `EF@${field.getName()}?${eventName}`;
    }
}