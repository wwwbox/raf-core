import IForm from "../form/IForm";
import FieldConfig from "./FieldConfig";
import Validator from "../protocol/Validator";

interface Props {
    loading: boolean;
    form: IForm;

    defaultValidator?: Validator;

    [propName: string]: any;
}

export type FieldProps = Partial<FieldConfig> & Props;