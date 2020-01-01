import IForm from "../form/IForm";

export default interface FieldRenderer {
    render(): any;

    getForm(): IForm;
}