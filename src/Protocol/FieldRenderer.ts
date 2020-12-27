import {Service} from '@autofiy/autofiyable';
import IForm from "../Form/IForm";

export interface FieldRenderer extends Service {
    render(): any;

    getForm(): IForm;
}

export default FieldRenderer;