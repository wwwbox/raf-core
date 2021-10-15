import {IForm} from "../Form/IForm";
import {FieldProps} from "./FieldProps";
import {FieldValueService} from "./Service/FieldValueService";
import {FieldValidator} from "./Service/FieldValidator";
import {FieldUIService} from "./Service/FieldUIService";
import {IFieldCollecting} from "./Collecting/FieldCollecting";
import {IFieldExtraConfiguration} from "./Configuration/FieldExtra";
import {FieldType} from "./Concrete/FieldType";
import {IFieldEvent} from "./FieldEvent/FieldEvent";


export interface IField<ExtraConfiguration = any> {

    valueService(): FieldValueService;

    validator(): FieldValidator;

    uiService(): FieldUIService;

    event(): IFieldEvent;

    extra(): IFieldExtraConfiguration<ExtraConfiguration>;

    collecting(): IFieldCollecting;

    getType(): FieldType;

    getForm(): IForm;

    getProps(): FieldProps;

    getName(): string;

    updateConfiguration<T>(key: string, newConfiguration: T, afterChange?: () => void): void;

    getConfiguration<T>(key: string): T;
}

export default IField;