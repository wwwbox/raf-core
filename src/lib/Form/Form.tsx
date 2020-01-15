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
import CollectedData from "../Utils/CollectedData";
import AutoFormEvent from "./AutoFormEvent";


export default class Form<Props extends FormProps = FormProps, State extends FormState = FormState>
    extends React.Component<Props, State>
    implements IForm {

    private readonly formRenderer: FormRenderer;
    private readonly fieldRenderer: FieldsRenderer;
    private readonly collector: Collector | null;
    private readonly submitter: Submitter | null;
    private readonly validator: Validator | null;

    private readonly registeredFields: IField[];

    private attachedData: CollectedData = new CollectedData();

    constructor(props: Props) {
        super(props);
        this.state = {loading: false} as any;

        this.formRenderer = Setup.getDefaultServiceOrPassed<FormRenderer>(this, props.services?.formRenderer, FormDefault.getFormRenderer());
        this.fieldRenderer = Setup.getDefaultServiceOrPassed<FieldsRenderer>(this, props.services?.fieldsRenderer, FormDefault.getFieldRenderer());
        this.collector = Setup.getDefaultServiceOrPassed<Collector | null>(this, props.services?.collector, FormDefault.getCollector());
        this.submitter = Setup.getDefaultServiceOrPassed<Submitter | null>(this, props.services?.submitter, FormDefault.getSubmitter());
        this.validator = Setup.getDefaultServiceOrPassed<Validator | null>(this, props.services?.validator, FormDefault.getValidator());
        this.registeredFields = [];

        this.setupAttachedData();
    }

    private setupAttachedData() {
        this.attachedData = new CollectedData();
        if (this.props.attach?.data) {
            this.attachedData.appendData(this.props.attach.data);
        }
        if (this.props.attach?.files) {
            this.attachedData.appendFiles(this.props.attach.files);
        }
    }

    public getFieldsRenderer = (): FieldsRenderer => {
        return this.fieldRenderer;
    };

    public getValidator = (): Validator | null => {
        return this.validator;
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

    public getRegisteredField = (name: string): IField | undefined => {
        for (let field of this.getRegisteredFields()) {
            if (field.getName() === name)
                return field;
        }
        return undefined;
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


    public collect = (): CollectedData => {
        if (!this.isReadyToCollect())
            throw new Error('FORM IS NOT READY TO COLLECT');

        const collectedData = new CollectedData();
        for (let field of this.getRegisteredFields()) {
            if (field.isFileField())
                collectedData.appendFile(field.getName(), field.getValue());
            else
                collectedData.append(field.getName(), field.getValue());
        }

        collectedData.merge(this.attachedData);
        return collectedData;
    };

    public isReadyToCollect = (): boolean => {
        for (let field of this.getRegisteredFields())
            if (!field.isReadyToCollect())
                return false;
        return true;
    };

    public attach = (key: string, value: any): void => {
        this.attachedData.append(key, value);
    };

    public deAttach = (key: string): void => {
        this.attachedData.remove(key);
    };

    public attachFile = (key: string, file: File | File[]): void => {
        this.attachedData.appendFile(key, file);
    };

    public deAttachFile = (key: string): void => {
        this.attachedData.removeFile(key);
    };

    public validate = (): boolean => {
        let valid = true;
        for (let field of this.getRegisteredFields()) {
            if (field.validate())
                valid = false;
        }
        return valid;
    };


    public submit = (): void => {
        if (!this.submitter)
            throw Error('CANNOT FIND Submitter');
        this.submitter.submit();
    };


    public emitEvent = (event: AutoFormEvent): void => {

        this.emitEventTo(this, this.props.on ? this.props.on : {} as any, event.type, event.payload);
        for (let field of this.getRegisteredFields())
            this.emitEventTo(field, field.getListeners(), event.type, event.payload);

    };

    private emitEventTo = (owner: IForm | IField, listeners: any, emittedEvent: string, payload: any): void => {
        const events = Object.keys(listeners);
        for (let event of events) {
            if (emittedEvent === event) {
                const listener = listeners[event];
                listener(owner, payload);
            }
        }
    };

}