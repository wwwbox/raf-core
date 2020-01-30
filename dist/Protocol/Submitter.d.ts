import IForm from "../Form/IForm";
export default interface Submitter {
    submit(): void;
    getForm(): IForm;
}
