import IForm from "./IForm";
import Collector from "../Protocol/Collector";
import Validator from "../Protocol/Validator";
import Submitter from "../Protocol/Submitter";
import FieldConfig from "../Field/FieldConfig";
import FormRenderer from "../Protocol/FormRenderer";
import FieldsRenderer from "../Protocol/FieldsRenderer";
import {Data, Files} from "../Utils/CollectedData";
import IField from "../Field/IField";

export default interface FormProps {
    fields: RenderConfig,

    services?: FormServices;

    attach?: {
        data?: Data;
        files?: Files;
    },

    on?: {
        [eventName: string]: (form: IForm, payload: any) => void;
    },

    onAnyValueChanged?: (key: string, value: any, field: IField, form: IForm) => void,

    initialValues?: any,

    [propName: string]: any;
}

export interface FormServices {
    collector?: FormService<Collector>;
    validator?: FormService<Validator>;
    submitter?: FormService<Submitter>;
    formRenderer?: FormService<FormRenderer>;
    fieldsRenderer?: FormService<FieldsRenderer>;
}

export type FormService<T> = (form: IForm) => T;

export type RenderConfig = (FieldConfig | FieldConfig[])[];