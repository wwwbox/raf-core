import IForm from "./IForm";
import Collector from "../protocol/Collector";
import Validator from "../protocol/Validator";
import Submitter from "../protocol/Submitter";

export default interface FormProps {
    
    fields : any[],

    services? : FormServices;

    [propName : string] : any;

}

export interface FormServices {
    collector? : FormService<Collector>;
    validator? : FormService<Validator>;
    submitter? : FormService<Submitter>;
}

export type FormService<T> = (form : IForm) => T;