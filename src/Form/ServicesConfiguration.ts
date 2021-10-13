import {ServiceConfiguration as SC} from "@autofiy/autofiyable/build/ServiceConfiguration";
import {ServiceCallback} from "@autofiy/autofiyable";
import {DefaultEventNameMaker, IEventNameMaker} from "../Event/IEventNameMaker";
import {Validator} from "../Protocol/Validator";
import {Submitter} from "../Protocol/Submitter";
import {FormRenderer} from "../Protocol/FormRenderer";
import {FieldRenderer} from "../Protocol/FieldRenderer";
import {DefaultFormUIService, FormUIService} from "./Services/FormUIService";
import {DefaultFormValidator, FormValidator} from "./Services/FormValidator";
import {DefaultEventService, EventService} from "./Services/EventService";
import {DefaultFormValueService, FormValueService} from "./Services/FormValueService";
import {DefaultFormFieldsManager, FormFieldsManager} from "./Services/FormFieldsManager";
import {Collector, DefaultCollector} from "./Services/Collector";
import {NotEmptyValidator} from "../Defaults/Services/Validator";
import {DefaultSubmitter} from "../Defaults/Services/DefaultSubmitter";
import {DefaultFieldRenderer} from "../Defaults/Services/DefaultFieldRenderer";
import {DefaultFormRenderer} from "../Defaults/Services/DefaultFormRenderer";

export interface ServiceConfiguration extends SC {
    eventNameMaker: ServiceCallback<IEventNameMaker>;
    validator: ServiceCallback<Validator>;
    submitter: ServiceCallback<Submitter>;
    formRenderer: ServiceCallback<FormRenderer>;
    fieldRenderer: ServiceCallback<FieldRenderer>;
    formUiService: ServiceCallback<FormUIService>,
    formValidator: ServiceCallback<FormValidator>,
    eventService: ServiceCallback<EventService>,
    formValueService: ServiceCallback<FormValueService>,
    fieldsManager: ServiceCallback<FormFieldsManager>,
    collector: ServiceCallback<Collector>,
}

export const DefaultServices: ServiceConfiguration = {
    eventNameMaker: () => new DefaultEventNameMaker(),
    validator: () => new NotEmptyValidator(),
    submitter: (autofiyable: any) => new DefaultSubmitter(autofiyable),
    fieldRenderer: (autofiyable: any) => new DefaultFieldRenderer(autofiyable),
    formRenderer: (autofiyable: any) => new DefaultFormRenderer(autofiyable),
    formUiService: (autofiyable: any) => new DefaultFormUIService(autofiyable),
    formValidator: (autofiyable: any) => new DefaultFormValidator(autofiyable),
    eventService: (autofiyable: any) => new DefaultEventService(autofiyable),
    formValueService: (autofiyable: any) => new DefaultFormValueService(autofiyable),
    fieldsManager: (autofiyable: any) => new DefaultFormFieldsManager(autofiyable),
    collector: (autofiyable: any) => new DefaultCollector(autofiyable),
}