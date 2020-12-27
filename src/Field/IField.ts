import {IForm} from "../Form/IForm";
import {FieldProps} from "./FieldProps";
import {IFieldValue} from "./Value/FieldValue";
import {IFieldValidation} from "./Validation/FieldValidation";
import {IFieldUI} from "./UI/FieldUI";
import {IFieldCollecting} from "./Collecting/FieldCollecting";
import {IFieldExtraConfiguration} from "./Configuration/FieldExtra";
import {FieldType} from "./Concrete/FieldType";
import {IFieldEvent} from "./FieldEvent/FieldEvent";


export interface IField<ExtraConfiguration = any> {

    value(): IFieldValue;

    validation(): IFieldValidation;

    ui(): IFieldUI;

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