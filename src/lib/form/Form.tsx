import * as React from "react";
import IForm from "./IForm";
import FormState from "./FormState";
import FormProps from "./FormProps";
import FormRenderer from "../protocol/FormRenderer";
import FieldRenderer from "../protocol/FieldRenderer";


export default class Form<State extends FormState = FormState, Props extends FormProps = FormProps>
    extends React.Component<Props, State>
    implements IForm {

    private formRenderer: FormRenderer;
    private fieldRenderer: FieldRenderer;

    constructor(props: Props) {
        super(props);
        this.state = { loading: false } as any;

        //todo : setup services
        this.formRenderer = null as any;
        this.fieldRenderer = null as any;
    }

    render() {
        return null;
    }


    public startLoading(): void {
        this.setState({ loading: true });
    }

    public stopLoading(): void {
        this.setState({ loading: false });
    }

    public isLoading(): boolean {
        return this.state.loading;
    }


}