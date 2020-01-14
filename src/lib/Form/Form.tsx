import * as React from "react";
import IForm from "./IForm";
import FormState from "./FormState";
import FormProps, {RenderConfig} from "./FormProps";
import FormRenderer from "./../Protocol/FormRenderer";
import FieldsRenderer from "../Protocol/FieldsRenderer";
import FormDefault from "./FormDefault";
import Setup from "./FormServiceSetup";
import Collector from "../Protocol/Collector";
import Submitter from "../Protocol/Submitter";
import Validator from "../Protocol/Validator";
import IField from "../Field/IField";


export default class Form<Props extends FormProps = FormProps, State extends FormState = FormState>
    extends React.Component<Props, State>
    implements IForm {

    private readonly formRenderer: FormRenderer;
    private readonly fieldRenderer: FieldsRenderer;
    private readonly collector: Collector | null;
    private readonly submitter: Submitter | null;
    private readonly validator: Validator | null;

    private readonly registeredFields: IField[];

    constructor(props: Props) {
        super(props);
        this.state = {loading: false} as any;

        this.formRenderer = Setup.getDefaultServiceOrPassed<FormRenderer>(this, props.services?.formRenderer, FormDefault.getFormRenderer());
        this.fieldRenderer = Setup.getDefaultServiceOrPassed<FieldsRenderer>(this, props.services?.fieldsRenderer, FormDefault.getFieldRenderer());
        this.collector = Setup.getDefaultServiceOrPassed<Collector | null>(this, props.services?.collector, FormDefault.getCollector());
        this.submitter = Setup.getDefaultServiceOrPassed<Submitter | null>(this, props.services?.submitter, FormDefault.getSubmitter());
        this.validator = Setup.getDefaultServiceOrPassed<Validator | null>(this, props.services?.validator, FormDefault.getValidator());
        this.registeredFields = [];
    }

    public getFieldsRenderer = (): FieldsRenderer => {
        return this.fieldRenderer;
    };

    render() {
        return this.formRenderer.render();
    }

    public registerField = (field: IField): void => {
        this.registeredFields.push(field);
    };

    public getRegisteredFields = (): IField[] => {
        return this.registeredFields;
    };

    public startLoading = (): void => {
        this.setState({loading: true});
    };

    public stopLoading = (): void => {
        this.setState({loading: false});
    };

    public isLoading = (): boolean => {
        return this.state.loading;
    };

    public getRenderConfig = (): RenderConfig => {
        return this.props.fields;
    };

    
}