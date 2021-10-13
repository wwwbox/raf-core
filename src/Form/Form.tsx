import {IForm} from "./IForm";
import {FormState} from "./FormState";
import {DefaultServices, FormProps, ServiceConfiguration} from "./FormProps";
import {IFormUIService} from "./FormUI/FormUIService";
import {IFormValidator} from "./FormValidation/FormValidator";
import {IEventService} from "./FormEvent/EventService";
import {IFormValueService} from "./FormValue/FormValueService";
import {IFormFieldsManager} from "./FieldManager/FormFieldsManager";
import {Submitter} from "../Protocol/Submitter";
import {GlobalEvents} from "../Event/DefaultEvents";
import {ICollector} from "./FormCollecting/ICollector";
import {AutofiyableComponent} from "@autofiy/autofiyable";

export class Form
    extends AutofiyableComponent<FormProps, FormState, ServiceConfiguration>
    implements IForm {

    protected _uiService: IFormUIService;
    protected _validator: IFormValidator;
    protected _eventService: IEventService;
    protected _valueService: IFormValueService;
    protected _fieldsManager: IFormFieldsManager;
    protected _collector: ICollector;
    protected _submitter: Submitter;

    constructor(props: FormProps) {
        super(props);
        this.state = {isLoading: false} as any;
        this._uiService = this.getServiceProvider().getService("formUiService");
        this._validator = this.getServiceProvider().getService("formValidator");
        this._eventService = this.getServiceProvider().getService("eventService");
        this._valueService = this.getServiceProvider().getService("formValueService");
        this._fieldsManager = this.getServiceProvider().getService("fieldsManager");
        this._collector = this.getServiceProvider().getService("collector");
        this._submitter = this.getServiceProvider().getService("submitter");
        this.setupListeners();
    }

    getDefaultServices(): ServiceConfiguration {
        return DefaultServices;
    }

    componentDidMount(): void {
        const values = this.props.initialValues ? this.props.initialValues : {};
        this.valueService().set(values);
        this.eventService().emit(GlobalEvents.FORM_READY, {});
    }

    render() {
        return this.uiService().render();
    }

    componentDidUpdate() {
        this.eventService().emit(GlobalEvents.FORM_RENDERED, {});
    }

    eventService(): IEventService {
        return this._eventService;
    }

    fieldsManager(): IFormFieldsManager {
        return this._fieldsManager;
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
            this.eventService().emit(GlobalEvents.FORM_NOT_READY_TO_COLLECT, {});
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

    collector(): ICollector {
        return this._collector;
    }

    protected initializeServices(): void {
    }

    private setupListeners(): void {
        const listeners = this.getProps().listen ?? {};
        const keys = Object.keys(listeners);
        keys.forEach(eventId => this.eventService().addListener("form", eventId, listeners[eventId]));
    }
}

export default Form;