/// <reference types="react" />
import FormRenderer from "../Protocol/FormRenderer";
import IForm from "../Form/IForm";
export default class SimpleFormRenderer implements FormRenderer {
    private readonly form;
    constructor(form: IForm);
    render(content: any): JSX.Element;
    getForm(): IForm;
}
