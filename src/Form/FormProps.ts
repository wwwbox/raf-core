import { DefaultCollector, IFormCollector } from './FormCollecting/IFormCollector';
import { FormFieldManager, IFormFieldManager } from './FieldManager/FormFieldManager';
import { FormValue, IFormValue } from './FormValue/FormValue';
import { FormEvent, IFormEvent } from './FormEvent/FormEvent';
import { FormValidation, IFormValidation } from './FormValidation/FormValidation';
import { DefaultFormRenderer } from './../Defaults/Services/DefaultFormRenderer';
import { DefaultSubmitter } from './../Defaults/Services/DefaultSubmitter';
import { NotEmptyValidator } from './../Defaults/Services/Validator';
import { DefaultEventNameMaker } from './../Event/IEventNameMaker';
import { IForm } from "./IForm";
import { IField } from "../Field/IField";
import { EventCallback } from "../Event/EventType";
import { FieldOptions } from "../Field/FieldProps";
import { Validator } from "../Protocol/Validator";
import { Submitter } from "../Protocol/Submitter";
import { FormRenderer } from "../Protocol/FormRenderer";
import { IEventNameMaker } from "../Event/IEventNameMaker";
import { FieldRenderer } from "../Protocol/FieldRenderer";
import { AutofiyableProps, ServiceConfiguration as SC, ServiceCallback } from "@autofiy/autofiyable";
import { DefaultFieldRenderer } from '../main';
import { FormUI, IFormUI } from './FormUI/FormUI';

export interface FormProps extends AutofiyableProps {
    fields: (FieldOptions | FieldOptions[])[],

    listen?: {
        [eventName: string]: EventCallback;
    },

    onAnyValueChanged?: (key: string, value: any, field: IField, form: IForm) => void,
    initialValues?: any,
    allowSubmitWhenNotValid?: boolean;
    extra?: any;
}

export default FormProps;



export interface ServiceConfiguration extends SC {
    eventNameMaker: ServiceCallback<IEventNameMaker>;
    validator: ServiceCallback<Validator>;
    submitter: ServiceCallback<Submitter>;
    formRenderer: ServiceCallback<FormRenderer>;
    fieldRenderer: ServiceCallback<FieldRenderer>;
    formUi: ServiceCallback<IFormUI>,
    formValidation: ServiceCallback<IFormValidation>,
    formEvent: ServiceCallback<IFormEvent>,
    formValue: ServiceCallback<IFormValue>,
    fieldManager: ServiceCallback<IFormFieldManager>,
    formCollector: ServiceCallback<IFormCollector>,
}


export function defaultServices(): ServiceConfiguration {
    return {
        eventNameMaker: () => new DefaultEventNameMaker(),
        validator: () => new NotEmptyValidator(),
        submitter: (autofiyable: any) => new DefaultSubmitter(autofiyable),
        fieldRenderer: (autofiyable: any) => new DefaultFieldRenderer(autofiyable),
        formRenderer: (autofiyable: any) => new DefaultFormRenderer(autofiyable),
        formUi: (autofiyable: any) => new FormUI(autofiyable),
        formValidation: (autofiyable: any) => new FormValidation(autofiyable),
        formEvent: (autofiyable: any) => new FormEvent(autofiyable),
        formValue: (autofiyable: any) => new FormValue(autofiyable),
        fieldManager: (autofiyable: any) => new FormFieldManager(autofiyable),
        formCollector: (autofiyable: any) => new DefaultCollector(autofiyable),
    }
}