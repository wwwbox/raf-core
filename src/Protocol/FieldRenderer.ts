import IForm from "../Form/IForm";

export default interface FieldRenderer {
    render(): any;

    getForm(): IForm;
}