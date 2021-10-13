import {IForm} from "./IForm";
import {FormState} from "./FormState";
import {DefaultServices, FormProps, ServiceConfiguration} from "./FormProps";
import {IFormUI} from "./FormUI/FormUI";
import {IFormValidator} from "./FormValidation/FormValidator";
import {IFormEvent} from "./FormEvent/FormEvent";
import {IFormValue} from "./FormValue/FormValue";
import {IFormFieldManager} from "./FieldManager/FormFieldManager";
import {Submitter} from "../Protocol/Submitter";
import {GlobalEvents} from "../Event/DefaultEvents";
import {IFormCollector} from "./FormCollecting/IFormCollector";
import {AutofiyableComponent} from "@autofiy/autofiyable";

export class Form
    extends AutofiyableComponent<FormProps, FormState, ServiceConfiguration>
    implements IForm {

    protected _ui: IFormUI;
    protected _validator: IFormValidator;
    protected _event: IFormEvent;
    protected _value: IFormValue;
    protected _fieldManager: IFormFieldManager;
    protected _collecting: IFormCollector;
    protected _submitter: Submitter;

    constructor(props: FormProps) {
        super(props);
        this.state = {isLoading: false} as any;
        this._ui = this.getServiceProvider().getService("formUi");
        this._validator = this.getServiceProvider().getService("formValidator");
        this._event = this.getServiceProvider().getService("formEvent");
        this._value = this.getServiceProvider().getService("formValue");
        this._fieldManager = this.getServiceProvider().getService("fieldManager");
        this._collecting = this.getServiceProvider().getService("formCollector");
        this._submitter = this.getServiceProvider().getService("submitter");
        this.setupListeners();
    }

    getDefaultServices(): ServiceConfiguration {
        return DefaultServices;
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
        const isValid = this.validator().validateWithEffect();
        if (!isValid && !this.getProps().allowSubmitWhenNotValid) {
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

    validator(): IFormValidator {
        return this._validator;
    }

    value(): IFormValue {
        return this._value;
    }

    collecting(): IFormCollector {
        return this._collecting;
    }

    protected initializeServices(): void {
    }

    private setupListeners(): void {
        const listeners = this.getProps().listen ?? {};
        const keys = Object.keys(listeners);
        keys.forEach(key => this.event().addListener("form", key, listeners[key]));
    }
}

export default Form;