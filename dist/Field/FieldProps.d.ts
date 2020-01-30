import IForm from "../Form/IForm";
import FieldConfig from "./FieldConfig";
import Validator from "../Protocol/Validator";
import IField from "./IField";
interface Props {
    loading?: boolean;
    form: IForm;
    defaultValidator?: Validator;
    on?: {
        [eventName: string]: (form: IField, payload: any) => void;
    };
    [propName: string]: any;
}
export declare type FieldProps = Partial<FieldConfig> & Props;
export {};
