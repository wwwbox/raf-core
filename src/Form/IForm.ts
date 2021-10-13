import {Autofiyable} from '@autofiy/autofiyable';
import {FormProps} from "./FormProps";
import {IFormFieldManager} from "./FieldManager/FormFieldManager";
import {IFormUI} from "./FormUI/FormUI";
import {IFormValue} from "./FormValue/FormValue";
import {IFormValidator} from "./FormValidation/FormValidator";
import {IFormEvent} from "./FormEvent/FormEvent";
import {FormState} from "./FormState";
import {IFormCollector} from "./FormCollecting/IFormCollector";

export interface IForm extends Autofiyable {

    fields(): IFormFieldManager;

    value(): IFormValue;

    event(): IFormEvent;

    validator(): IFormValidator;

    ui(): IFormUI;

    collecting(): IFormCollector;

    submit(): void;

    getProps(): FormProps;

    updateInternalState(payload: Partial<FormState>, afterChange?: () => void): void;

    getInternalState(): FormState;

}

export default IForm;