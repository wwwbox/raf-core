import IForm from "../Form/IForm";
import {FieldCollectingConfiguration} from "./Collecting/FieldCollectingConfiguration";
import {FieldUIConfiguration} from "./UI/FieldUIConfiguration";
import {FieldValidationConfiguration} from "./Validation/FieldValidationConfiguration";
import {FieldValueConfiguration} from "./Value/FieldValueConfiguration";
import {EventCallback} from "../Event/EventType";
import Validator from "../Protocol/Validator";
import {IEventNameMaker} from "../Event/IEventNameMaker";

export interface FieldInjectedProps {
    form: IForm;
    injectedValidator: Validator;
    injectedEventNameMaker: IEventNameMaker;
}

export interface FieldOptions extends FieldCollectingConfiguration,
    Partial<FieldUIConfiguration>,
    Partial<FieldValidationConfiguration>,
    Partial<FieldValueConfiguration> {

    as: any;
    name: string;

    listen?: { [eventName: string]: EventCallback; },
    listenThis?: { [eventName: string]: EventCallback; },

    extra?: {
        [propName: string]: any;
    }
}


//todo : why & when InjectedProps already extends FieldOptions
export type FieldProps = FieldOptions & FieldInjectedProps;