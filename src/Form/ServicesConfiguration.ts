import {ServiceConfiguration as SC} from "@autofiy/autofiyable/build/ServiceConfiguration";
import {ServiceCallback} from "@autofiy/autofiyable";
import {DefaultEventNameMaker, IEventNameMaker} from "../Event/IEventNameMaker";
import {Validator} from "../Protocol/Validator";
import {Submitter} from "../Protocol/Submitter";
import {FormRenderer} from "../Protocol/FormRenderer";
import {FieldRenderer} from "../Protocol/FieldRenderer";
import {FormUIService, IFormUIService} from "./FormUI/FormUIService";
import {FormValidator, IFormValidator} from "./FormValidation/FormValidator";
import {EventService, IEventService} from "./FormEvent/EventService";
import {FormValueService, IFormValueService} from "./FormValue/FormValueService";
import {FormFieldsManager, IFormFieldsManager} from "./FieldManager/FormFieldsManager";
import {DefaultCollector, ICollector} from "./FormCollecting/ICollector";
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
    formUiService: ServiceCallback<IFormUIService>,
    formValidator: ServiceCallback<IFormValidator>,
    eventService: ServiceCallback<IEventService>,
    formValueService: ServiceCallback<IFormValueService>,
    fieldsManager: ServiceCallback<IFormFieldsManager>,
    collector: ServiceCallback<ICollector>,
}

export const DefaultServices: ServiceConfiguration = {
    eventNameMaker: () => new DefaultEventNameMaker(),
    validator: () => new NotEmptyValidator(),
    submitter: (autofiyable: any) => new DefaultSubmitter(autofiyable),
    fieldRenderer: (autofiyable: any) => new DefaultFieldRenderer(autofiyable),
    formRenderer: (autofiyable: any) => new DefaultFormRenderer(autofiyable),
    formUiService: (autofiyable: any) => new FormUIService(autofiyable),
    formValidator: (autofiyable: any) => new FormValidator(autofiyable),
    eventService: (autofiyable: any) => new EventService(autofiyable),
    formValueService: (autofiyable: any) => new FormValueService(autofiyable),
    fieldsManager: (autofiyable: any) => new FormFieldsManager(autofiyable),
    collector: (autofiyable: any) => new DefaultCollector(autofiyable),
}