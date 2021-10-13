import {Autofiyable} from '@autofiy/autofiyable';
import {FormProps} from "./FormProps";
import {FormFieldsManager} from "./Services/FormFieldsManager";
import {FormUIService} from "./Services/FormUIService";
import {FormValueService} from "./Services/FormValueService";
import {FormValidator} from "./Services/FormValidator";
import {EventService} from "./Services/EventService";
import {FormState} from "./FormState";
import {Collector} from "./Services/Collector";

export interface IForm extends Autofiyable {

    fieldsManager(): FormFieldsManager;

    valueService(): FormValueService;

    eventService(): EventService;

    validator(): FormValidator;

    uiService(): FormUIService;

    collector(): Collector;

    submit(): void;

    getProps(): FormProps;

    updateInternalState(payload: Partial<FormState>, afterChange?: () => void): void;

    getInternalState(): FormState;

}

export default IForm;