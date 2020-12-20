import { Service } from '@autofiy/autofiyable';
import IForm from "../Form/IForm";

export interface Submitter extends Service {

    submit(): void;

    getForm(): IForm;
}

export default Submitter;