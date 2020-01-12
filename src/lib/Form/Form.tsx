import * as React from "react";
import IForm from "./IForm";
import FormState from "./FormState";
import FormProps from "./FormProps";
import FormRenderer from "./../Protocol/FormRenderer";
import FieldRenderer from "./../Protocol/FieldRenderer";
import FieldConfig from "./../Field/FieldConfig";


export default class Form<Props extends FormProps = FormProps, State extends FormState = FormState>
    extends React.Component<Props, State>
    implements IForm {

    private formRenderer: FormRenderer;
    private fieldRenderer: FieldRenderer;

    constructor(props: Props) {
        super(props);
        this.state = {loading: false} as any;

        this.formRenderer = null as any;
        this.fieldRenderer = null as any;
    }

    render() {
        return null;
    }


    public startLoading(): void {
        this.setState({loading: true});
    }

    public stopLoading(): void {
        this.setState({loading: false});
    }

    public isLoading(): boolean {
        return this.state.loading;
    }

    public getFieldsConfig(): FieldConfig[] {
        return this.props.fields;
    }
}
