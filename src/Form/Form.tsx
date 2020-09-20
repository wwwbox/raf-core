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


export default class Form extends React.Component<FormProps, FormState>
    implements IForm {


    protected _ui: IFormUI;
    protected _validation: IFormValidation;
    protected _event: IFormEvent;
    protected _value: IFormValue;
    protected _fieldManager: IFormFieldManager;

    protected _submitter: Submitter;


    constructor(props: FormProps) {
        super(props);
        this.state = {isLoading: false} as any;
        this._ui = new FormUI(this);
        this._validation = new FormValidation(this);
        this._event = new FormEvent(this);
        this._value = new FormValue(this);
        this._fieldManager = new FormFieldManager(this);
        this._submitter = getFormService("submitter", this, this.props.services?.submitter, FormDefault.getSubmitter())
    }

    componentDidMount(): void {
        const values = this.props.initialValues ? this.props.initialValues : {};
        this.value().set(values);
    }


    render() {
        return this.ui().render();
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
        if (!this.validation().validate()) {
            if (!this.getProps().allowSubmitWhenNotValid) {
                return;
            }
        }
        this._submitter.submit();
    }

    ui(): IFormUI {
        return this._ui;
    }

    updateInternalState(payload: Partial<FormState>): void {
        this.setState(payload as any);
    }

    validation(): IFormValidation {
        return this._validation;
    }

    value(): IFormValue {
        return this._value;
    }
}