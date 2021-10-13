import {IForm} from "./IForm";
import {FormState} from "./FormState";
import {DefaultServices, ServiceConfiguration} from "./ServicesConfiguration";
import {FormUIService} from "./Services/FormUIService";
import {FormValidator} from "./Services/FormValidator";
import {EventService} from "./Services/EventService";
import {FormValueService} from "./Services/FormValueService";
import {FormFieldsManager} from "./Services/FormFieldsManager";
import {Submitter} from "../Protocol/Submitter";
import {GlobalEvents} from "../Event/DefaultEvents";
import {Collector} from "./Services/Collector";
import {AutofiyableComponent} from "@autofiy/autofiyable";
import {FormProps} from "./FormProps";

export class Form
    extends AutofiyableComponent<FormProps, FormState, ServiceConfiguration>
    implements IForm {

    protected _uiService: FormUIService;
    protected _validator: FormValidator;
    protected _eventService: EventService;
    protected _valueService: FormValueService;
    protected _fieldsManager: FormFieldsManager;
    protected _collector: Collector;
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

    eventService(): EventService {
        return this._eventService;
    }

    fieldsManager(): FormFieldsManager {
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

    uiService(): FormUIService {
        return this._uiService;
    }

    updateInternalState(payload: Partial<FormState>, afterChange?: () => void): void {
        this.setState(payload as any, afterChange);
    }

    validator(): FormValidator {
        return this._validator;
    }

    valueService(): FormValueService {
        return this._valueService;
    }

    collector(): Collector {
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