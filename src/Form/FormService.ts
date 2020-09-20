import IForm from "./IForm";
import Validator from "../Protocol/Validator";
import Submitter from "../Protocol/Submitter";
import FormRenderer from "../Protocol/FormRenderer";
import {IEventNameMaker} from "../Event/IEventNameMaker";
import FieldRenderer from "../Protocol/FieldRenderer";

export type FormService<T> = (form: IForm) => T;

export interface FormServices {
    eventNameMaker?: FormService<IEventNameMaker>;
    validator?: FormService<Validator>;
    submitter?: FormService<Submitter>;
    formRenderer?: FormService<FormRenderer>;
    fieldRenderer?: FormService<FieldRenderer>;
}


export function getFormService<T>(name: string, form: IForm, passed?: FormService<T>, defaultService?: FormService<T> | null): T {

    if (passed) {
        return passed(form);
    }

    if (defaultService) {
        return defaultService(form);
    }

    throw Error(`cannot find form service : ${name}`);
}