import FormProps from "./FormProps";
import {IFromFieldManager} from "./FieldManager/FieldManager";
import {IFormUI} from "./FormUI/FormUI";
import {IFormValue} from "./FormValue/FormValue";
import {IFormValidation} from "./FormValidation/FormValidation";
import {IFormEvent} from "./FormEvent/FormEvent";
import FormState from "./FormState";


export default interface IForm {

    fields(): IFromFieldManager;

    value(): IFormValue;

    event(): IFormEvent;

    validation(): IFormValidation;

    ui(): IFormUI;

    submit(): void;

    getProps(): FormProps;

    updateInternalState(payload: Partial<FormState>): void;

    getInternalState(): FormState;

}