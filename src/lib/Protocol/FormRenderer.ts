import IForm from "../Form/IForm";

export default interface FormRenderer {
    render(): any;

    getForm(): IForm;
}