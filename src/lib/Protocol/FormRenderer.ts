import IForm from "../Form/IForm";

export default interface FormRenderer {
    render(content: any): any;

    getForm(): IForm;
}