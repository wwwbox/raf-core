import {IForm} from "./IForm";
import {FormState} from "./FormState";
import {DefaultServices, FormProps, ServiceConfiguration} from "./FormProps";
import {IFormUIService} from "./FormUI/FormUIService";
import {IFormValidator} from "./FormValidation/FormValidator";
import {IFormEvent} from "./FormEvent/FormEvent";
import {IFormValueService} from "./FormValue/FormValueService";
import {IFormFieldManager} from "./FieldManager/FormFieldManager";
import {Submitter} from "../Protocol/Submitter";
import {GlobalEvents} from "../Event/DefaultEvents";
import {IFormCollector} from "./FormCollecting/IFormCollector";
import {AutofiyableComponent} from "@autofiy/autofiyable";

export class Form
    extends AutofiyableComponent<FormProps, FormState, ServiceConfiguration>
    implements IForm {

    protected _uiService: IFormUIService;
    protected _validator: IFormValidator;
    protected _event: IFormEvent;
    protected _valueService: IFormValueService;
    protected _fieldManager: IFormFieldManager;
    protected _collecting: IFormCollector;
    protected _submitter: Submitter;

    constructor(props: FormProps) {
        super(props);
        this.state = {isLoading: false} as any;
        this._uiService = this.getServiceProvider().getService("formUiService");
        this._validator = this.getServiceProvider().getService("formValidator");
        this._event = this.getServiceProvider().getService("formEvent");
        this._valueService = this.getServiceProvider().getService("formValueService");
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
        this.valueService().set(values);
        this.event().emit(GlobalEvents.FORM_READY, {});
    }

    render() {
        return this.uiService().render();
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

        if (!this.valueService().isReady()) {
            this.event().emit(GlobalEvents.FORM_NOT_READY_TO_COLLECT, {});
            return;
        }

        this._submitter.submit();
    }

    uiService(): IFormUIService {
        return this._uiService;
    }

    updateInternalState(payload: Partial<FormState>, afterChange?: () => void): void {
        this.setState(payload as any, afterChange);
    }

    validator(): IFormValidator {
        return this._validator;
    }

    valueService(): IFormValueService {
        return this._valueService;
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