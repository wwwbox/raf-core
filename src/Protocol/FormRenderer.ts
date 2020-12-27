import {Service} from '@autofiy/autofiyable';
import IForm from "../Form/IForm";

export interface FormRenderer extends Service {
    render(): any;

    getForm(): IForm;
}

export default FormRenderer;