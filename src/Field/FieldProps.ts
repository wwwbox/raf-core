import {IForm} from "../Form/IForm";
import {FieldCollectingConfiguration} from "./Collecting/FieldCollectingConfiguration";
import {FieldUIConfiguration} from "./Configuration/FieldUIConfiguration";
import {FieldValidationConfiguration} from "./Configuration/FieldValidationConfiguration";
import {FieldValueConfiguration} from "./Configuration/FieldValueConfiguration";
import {EventCallback} from "../Event/EventType";
import {Validator} from "../Protocol/Validator";
import {IEventNameMaker} from "../Event/IEventNameMaker";
import {ExtraRefresher} from "./ExtraRefresher";


export interface FieldInjectedProps {
    form: IForm;
    injectedValidator: Validator;
    injectedEventNameMaker: IEventNameMaker;
}

export interface FieldOptions
    extends Partial<FieldCollectingConfiguration>,
        Partial<FieldUIConfiguration>,
        Partial<FieldValidationConfiguration>,
        Partial<FieldValueConfiguration> {

    as: any;
    name: string;

    listenThis?: { [eventName: string]: EventCallback; },

    refresher?: ExtraRefresher;

    extra?: {
        [propName: string]: any;
    }
}

export type FieldProps = FieldOptions & FieldInjectedProps;