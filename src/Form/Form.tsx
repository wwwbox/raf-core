import * as React from "react";
import IForm from "./IForm";
import FormState from "./FormState";
import FormProps from "./FormProps";
import {FormUI, IFormUI} from "./FormUI/FormUI";
import {FormValidation, IFormValidation} from "./FormValidation/FormValidation";
import {FormEvent, IFormEvent} from "./FormEvent/FormEvent";
import {FormValue, IFormValue} from "./FormValue/FormValue";
import {FormFieldManager, IFormFieldManager} from "./FieldManager/FormFieldManager";
import Submitter from "../Protocol/Submitter";
import {getFormService} from "./FormService";
import FormDefault from "./FormDefault";
import {GlobalEvents} from "../Event/DefaultEvents";
import {DefaultCollector, IFormCollector} from "./FormCollecting/IFormCollector";


export default class Form extends React.Component<FormProps, FormState>
    implements IForm {


    protected _ui: IFormUI;
    protected _validation: IFormValidation;
    protected _event: IFormEvent;
    protected _value: IFormValue;
    protected _fieldManager: IFormFieldManager;
    protected _collecting: IFormCollector;

    protected _submitter: Submitter;


    constructor(props: FormProps) {
        super(props);
        this.state = {isLoading: false} as any;
        this._ui = new FormUI(this);
        this._validation = new FormValidation(this);
        this._event = new FormEvent(this);
        this._value = new FormValue(this);
        this._fieldManager = new FormFieldManager(this);
        this._collecting = new DefaultCollector(this);
        this._submitter = getFormService("submitter", this, this.props.services?.submitter, FormDefault.getSubmitter());

        this.setupListeners();
    }

    componentDidMount(): void {
        const values = this.props.initialValues ? this.props.initialValues : {};
        this.value().set(values);
        this.event().emit(GlobalEvents.FORM_READY, {});
    }


    render() {
        return this.ui().render();
    }

    componentDidUpdate(prevProps: Readonly<FormProps>, prevState: Readonly<FormState>, snapshot?: any) {
        this.event().emit(GlobalEvents.FORM_RENDERED, {});
    }

    event(): IFormEvent {
        return this._event;
    }

    fields(): IFormFieldManager {
        return this._fieldManager;
    }

    getInternalState(): FormState {
        return this.state;
    }

    getProps(): FormProps {
        return this.props;
    }

    submit(): void {
        if (!this.getProps().allowSubmitWhenNotValid && !this.validation().validate()) {
            return;
        }

        if (!this.value().isReady()) {
            this.event().emit(GlobalEvents.FORM_NOT_READY_TO_COLLECT, {});
            return;
        }

        this._submitter.submit();
    }

    ui(): IFormUI {
        return this._ui;
    }

    updateInternalState(payload: Partial<FormState>, afterChange?: () => void): void {
        this.setState(payload as any, afterChange);
    }

    validation(): IFormValidation {
        return this._validation;
    }

    value(): IFormValue {
        return this._value;
    }

    collecting(): IFormCollector {
        return this._collecting;
    }

    private setupListeners(): void {
        const listeners = this.getProps().listen ?? {};
        const keys = Object.keys(listeners);
        keys.forEach(key => this.event().addListener("form", key, listeners[key]));
    }
}