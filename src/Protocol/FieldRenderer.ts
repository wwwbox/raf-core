import { Service } from '@autofiy/autofiyable';
import IForm from "../Form/IForm";

export default interface FieldRenderer extends Service {
    render(): any;

    getForm(): IForm;
}