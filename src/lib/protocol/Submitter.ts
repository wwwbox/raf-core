import IForm from "../form/IForm";

export default interface Submitter {

    submit(): void;

    getForm(): IForm;
}