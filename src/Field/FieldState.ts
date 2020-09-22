import {FieldCollectingConfiguration} from "./Collecting/FieldCollectingConfiguration";
import {FieldUIConfiguration} from "./UI/FieldUIConfiguration";
import {FieldValidationConfiguration} from "./Validation/FieldValidationConfiguration";
import {FieldValueConfiguration} from "./Value/FieldValueConfiguration";

export default interface FieldState {
    collecting: FieldCollectingConfiguration;
    ui: FieldUIConfiguration;
    validation: FieldValidationConfiguration;
    value: FieldValueConfiguration;
    extra: {
        [propName: string]: any
    };
}