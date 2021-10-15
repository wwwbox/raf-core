import {IForm} from "../Form/IForm";
import {FieldCollectorConfiguration} from "./Configuration/FieldCollectorConfiguration";
import {FieldUIConfiguration} from "./Configuration/FieldUIConfiguration";
import {FieldValidationConfiguration} from "./Configuration/FieldValidationConfiguration";
import {FieldValueConfiguration} from "./Configuration/FieldValueConfiguration";
import {EventCallback} from "../Event/EventType";
import {Validator} from "../Protocol/Validator";
import {IEventNameMaker} from "../Event/IEventNameMaker";
import {ExtraConfigurationRefresher} from "./Service/ExtraConfigurationRefresher";


export interface FieldInjectedProps {
    form: IForm;
    injectedValidator: Validator;
    injectedEventNameMaker: IEventNameMaker;
}

export interface FieldOptions
    extends Partial<FieldCollectorConfiguration>,
        Partial<FieldUIConfiguration>,
        Partial<FieldValidationConfiguration>,
        Partial<FieldValueConfiguration> {

    as: any;
    name: string;

    listenThis?: { [eventName: string]: EventCallback; },

    refresher?: ExtraConfigurationRefresher;

    extra?: {
        [propName: string]: any;
    }
}

export type FieldProps = FieldOptions & FieldInjectedProps;