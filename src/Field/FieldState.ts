import {FieldCollectorConfiguration} from "./Configuration/FieldCollectorConfiguration";
import {FieldUIConfiguration} from "./Configuration/FieldUIConfiguration";
import {FieldValidationConfiguration} from "./Configuration/FieldValidationConfiguration";
import {FieldValueConfiguration} from "./Configuration/FieldValueConfiguration";

export interface FieldState<Extra = any> {
    collecting: FieldCollectorConfiguration;
    ui: FieldUIConfiguration;
    validation: FieldValidationConfiguration;
    value: FieldValueConfiguration;
    extra: Extra;
}


export default FieldState;