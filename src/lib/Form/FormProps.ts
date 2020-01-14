import IForm from "./IForm";
import Collector from "../Protocol/Collector";
import Validator from "../Protocol/Validator";
import Submitter from "../Protocol/Submitter";
import FieldConfig from "../Field/FieldConfig";
import FormRenderer from "../Protocol/FormRenderer";
import FieldsRenderer from "../Protocol/FieldsRenderer";

export default interface FormProps {

    fields: RenderConfig,

    services?: FormServices;

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