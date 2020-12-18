import { Service } from '@autofiy/autofiyable';
import IForm from "../Form/IForm";

export default interface Submitter extends Service {

    submit(): void;

    getForm(): IForm;
}