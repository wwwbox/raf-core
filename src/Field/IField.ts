import {IForm} from "../Form/IForm";
import {FieldProps} from "./FieldProps";
import {FieldValueService} from "./Service/FieldValueService";
import {FieldValidator} from "./Service/FieldValidator";
import {FieldUIService} from "./Service/FieldUIService";
import {FieldCollector} from "./Service/FieldCollector";
import {FieldExtraConfigurationService} from "./Service/FieldExtraConfigurationService";
import {FieldType} from "./FieldType";
import {FieldEventService} from "./Service/FieldEventService";


export interface IField<ExtraConfiguration = any> {

    valueService(): FieldValueService;

    validator(): FieldValidator;

    uiService(): FieldUIService;

    eventService(): FieldEventService;

    extra(): FieldExtraConfigurationService<ExtraConfiguration>;

    collector(): FieldCollector;

    getType(): FieldType;

    getForm(): IForm;

    getProps(): FieldProps;

    getName(): string;

    updateConfiguration<T>(key: string, newConfiguration: T, afterChange?: () => void): void;

    getConfiguration<T>(key: string): T;
}

export default IField;