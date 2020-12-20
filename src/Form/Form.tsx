import * as React from "react";
import { IForm } from "./IForm";
import { FormState } from "./FormState";
import { FormProps, DEFAULT_SERVICES, ServiceConfiguration } from "./FormProps";
import { IFormUI } from "./FormUI/FormUI";
import { IFormValidation } from "./FormValidation/FormValidation";
import { IFormEvent } from "./FormEvent/FormEvent";
import { IFormValue } from "./FormValue/FormValue";
import { IFormFieldManager } from "./FieldManager/FormFieldManager";
import { Submitter } from "../Protocol/Submitter";
import { GlobalEvents } from "../Event/DefaultEvents";
import { IFormCollector } from "./FormCollecting/IFormCollector";
import { AutofiyableComponent } from "@autofiy/autofiyable";

export class Form
    extends AutofiyableComponent<FormProps, FormState, ServiceConfiguration>
    implements IForm {

    protected _ui: IFormUI = null as any;
    protected _validation: IFormValidation = null as any;
    protected _event: IFormEvent = null as any;
    protected _value: IFormValue = null as any;
    protected _fieldManager: IFormFieldManager = null as any;
    protected _collecting: IFormCollector = null as any;
    protected _submitter: Submitter = null as any;

    constructor(props: FormProps) {
        super(props);
        this.state = { isLoading: false } as any;
        this.setupListeners();

        this._ui = this.getServiceProvider().getService("formUi");
        this._validation = this.getServiceProvider().getService("formValidation");
        this._event = this.getServiceProvider().getService("formEvent");
        this._value = this.getServiceProvider().getService("formValue");
        this._fieldManager = this.getServiceProvider().getService("fieldManager");
        this._collecting = this.getServiceProvider().getService("formCollector");
        this._submitter = this.getServiceProvider().getService("submitter");

    }

    protected initializeServices(): void {
    }

    getDefaultServices(): ServiceConfiguration {
        return DEFAULT_SERVICES;
    }

    componentDidMount(): void {
        const values = this.props.initialValues ? this.props.initialValues : {};
        this.value().set(values);
        this.event().emit(GlobalEvents.FORM_READY, {});
    }


    render() {
        return this.ui().render();
    }

    componentDidUpdate() {
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

export default Form;