import { Service } from '@autofiy/autofiyable';
import IForm from "../Form/IForm";

export default interface FormRenderer extends Service {
    render(): any;

    getForm(): IForm;
}