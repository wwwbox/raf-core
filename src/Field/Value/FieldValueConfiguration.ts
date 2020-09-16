import FieldChangeHandler from "../../Protocol/FieldChangeHandler";
import IField from "../IField";
import DefaultFieldChangeHandler from "../../ChangeHandler/DefaultFieldChangeHandler";

export interface FieldValueConfiguration {
    value: any;
    clearValue: any;
    valueChangeHandler: ((field: IField) => FieldChangeHandler) | null;

    defaultChangeHandler: (field: IField) => FieldChangeHandler;
}

export const DEFAULT_FIELD_VALUE_CONFIGURATION: FieldValueConfiguration = {
    value: null,
    clearValue: '',
    valueChangeHandler: null,
    defaultChangeHandler: field => new DefaultFieldChangeHandler(field)
}