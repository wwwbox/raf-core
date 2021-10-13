import {DefaultCollector, IFormCollector} from './FormCollecting/IFormCollector';
import {FormFieldManager, IFormFieldManager} from './FieldManager/FormFieldManager';
import {FormValueService, IFormValueService} from './FormValue/FormValueService';
import {FormEvent, IFormEvent} from './FormEvent/FormEvent';
import {FormValidator, IFormValidator} from './FormValidation/FormValidator';
import {DefaultFormRenderer} from '../Defaults/Services/DefaultFormRenderer';
import {DefaultSubmitter} from '../Defaults/Services/DefaultSubmitter';
import {NotEmptyValidator} from '../Defaults/Services/Validator';
import {DefaultEventNameMaker, IEventNameMaker} from '../Event/IEventNameMaker';
import {IForm} from "./IForm";
import {IField} from "../Field/IField";
import {EventCallback} from "../Event/EventType";
import {FieldOptions} from "../Field/FieldProps";
import {Validator} from "../Protocol/Validator";
import {Submitter} from "../Protocol/Submitter";
import {FormRenderer} from "../Protocol/FormRenderer";
import {FieldRenderer} from "../Protocol/FieldRenderer";
import {AutofiyableProps, ServiceCallback, ServiceConfiguration as SC} from "@autofiy/autofiyable";
import {DefaultFieldRenderer} from '../main';
import {FormUIService, IFormUIService} from './FormUI/FormUIService';

export interface FormProps extends AutofiyableProps {
    fields: (FieldOptions | FieldOptions[])[],

    listen?: {
        [eventName: string]: EventCallback;
    },

    onAnyValueChanged?: (key: string, value: any, field: IField, form: IForm) => void,
    initialValues?: any,
    allowSubmitWhenNotValid?: boolean;
}

export default FormProps;


export interface ServiceConfiguration extends SC {
    eventNameMaker: ServiceCallback<IEventNameMaker>;
    validator: ServiceCallback<Validator>;
    submitter: ServiceCallback<Submitter>;
    formRenderer: ServiceCallback<FormRenderer>;
    fieldRenderer: ServiceCallback<FieldRenderer>;
    formUiService: ServiceCallback<IFormUIService>,
    formValidator: ServiceCallback<IFormValidator>,
    formEvent: ServiceCallback<IFormEvent>,
    formValueService: ServiceCallback<IFormValueService>,
    fieldManager: ServiceCallback<IFormFieldManager>,
    formCollector: ServiceCallback<IFormCollector>,
}

//TODO : move into its own file
export const DefaultServices: ServiceConfiguration = {
    eventNameMaker: () => new DefaultEventNameMaker(),
    validator: () => new NotEmptyValidator(),
    submitter: (autofiyable: any) => new DefaultSubmitter(autofiyable),
    fieldRenderer: (autofiyable: any) => new DefaultFieldRenderer(autofiyable),
    formRenderer: (autofiyable: any) => new DefaultFormRenderer(autofiyable),
    formUiService: (autofiyable: any) => new FormUIService(autofiyable),
    formValidator: (autofiyable: any) => new FormValidator(autofiyable),
    formEvent: (autofiyable: any) => new FormEvent(autofiyable),
    formValueService: (autofiyable: any) => new FormValueService(autofiyable),
    fieldManager: (autofiyable: any) => new FormFieldManager(autofiyable),
    formCollector: (autofiyable: any) => new DefaultCollector(autofiyable),
}