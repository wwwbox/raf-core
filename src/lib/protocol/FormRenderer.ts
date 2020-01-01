import IForm from "../form/IForm";

export default interface FormRenderer {
    render(): any;

    getForm(): IForm;
}