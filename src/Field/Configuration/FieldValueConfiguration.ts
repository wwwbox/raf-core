import {FieldChangeHandler} from "../../Protocol/FieldChangeHandler";
import {IField} from "../IField";
import {DefaultFieldChangeHandler} from "../../ChangeHandler/DefaultFieldChangeHandler";

export interface FieldValueConfiguration {
    value: any;
    clearValue: any;
    valueChangeHandler: ((field: IField) => FieldChangeHandler) | null;
    defaultChangeHandler: (field: IField) => FieldChangeHandler;
    extractValueFromEvent?: (event: any) => any;
}