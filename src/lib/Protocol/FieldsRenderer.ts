import IForm from "../Form/IForm";

export default interface FieldsRenderer {
    render(): any;

    getForm(): IForm;
}