import IForm from "../Form/IForm";
import FieldConfig from "./FieldConfig";
import Validator from "../Protocol/Validator";

interface Props {
    loading?: boolean;
    form: IForm;

    defaultValidator?: Validator;

    [propName: string]: any;
}

export type FieldProps = Partial<FieldConfig> & Props;