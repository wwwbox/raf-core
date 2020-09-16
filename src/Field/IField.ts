import IForm from "../Form/IForm";
import {FieldProps} from "./FieldProps";
import {EventCallback} from "../Protocol/EventType";
import {IFieldValue} from "./Value/FieldValue";
import {IFieldValidation} from "./Validation/FieldValidation";
import {IFieldUI} from "./UI/FieldUI";
import {IFieldCollecting} from "./Collecting/FieldCollecting";
import {IFieldExtraConfiguration} from "./Configuration/FieldExtra";
import {FieldType} from "./Concrete/FieldType";


export default interface IField<ExtraConfiguration> {

    value(): IFieldValue;

    validation(): IFieldValidation;

    ui(): IFieldUI;

    extra(): IFieldExtraConfiguration<ExtraConfiguration>;

    collecting(): IFieldCollecting;

    getType(): FieldType;

    getForm(): IForm;

    getProps(): FieldProps;

    getName(): string;

    updateConfiguration<T>(key: string, newConfiguration: T, afterChange?: () => void): void;

    getConfiguration<T>(key: string): T;

    listen(type: string, callback: EventCallback): void;

}