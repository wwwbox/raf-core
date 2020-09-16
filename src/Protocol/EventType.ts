import IForm from "../Form/IForm";

export enum EventType {

}

export type EventCallback = (form: IForm, data?: any) => void;