import {Autofiyable} from '@autofiy/autofiyable';
import {FormProps} from "./FormProps";
import {IFormFieldsManager} from "./FieldManager/FormFieldsManager";
import {IFormUIService} from "./FormUI/FormUIService";
import {IFormValueService} from "./FormValue/FormValueService";
import {IFormValidator} from "./FormValidation/FormValidator";
import {IFormEvent} from "./FormEvent/FormEvent";
import {FormState} from "./FormState";
import {IFormCollector} from "./FormCollecting/IFormCollector";

export interface IForm extends Autofiyable {

    fieldsManager(): IFormFieldsManager;

    valueService(): IFormValueService;

    event(): IFormEvent;

    validator(): IFormValidator;

    uiService(): IFormUIService;

    collecting(): IFormCollector;

    submit(): void;

    getProps(): FormProps;

    updateInternalState(payload: Partial<FormState>, afterChange?: () => void): void;

    getInternalState(): FormState;

}

export default IForm;