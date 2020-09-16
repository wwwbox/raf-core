import IForm from "../Form/IForm";
import {FieldCollectingConfiguration} from "./Collecting/FieldCollectingConfiguration";
import {FieldUIConfiguration} from "./UI/FieldUIConfiguration";
import {FieldValidationConfiguration} from "./Validation/FieldValidationConfiguration";
import {FieldValueConfiguration} from "./Value/FieldValueConfiguration";
import {EventCallback} from "../Protocol/EventType";
import Validator from "../Protocol/Validator";

interface InjectedProps extends FieldOptions {
    form: IForm;
    injectedValidator: Validator;
}

export interface FieldOptions extends FieldCollectingConfiguration,
    Partial<FieldUIConfiguration>,
    Partial<FieldValidationConfiguration>,
    Partial<FieldValueConfiguration> {

    as: any;
    name: string;

    listen?: { [eventName: string]: EventCallback; },

    extra?: {
        [propName: string]: any;
    }
}

export type FieldProps = FieldOptions & InjectedProps;