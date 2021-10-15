import {DefaultFieldChangeHandler} from "../../../ChangeHandler/DefaultFieldChangeHandler";
import {FieldValueConfiguration} from "../FieldValueConfiguration";

export function getDefaultFieldValueConfiguration(): FieldValueConfiguration {
    return {
        value: '',
        clearValue: '',
        valueChangeHandler: null,
        defaultChangeHandler: field => new DefaultFieldChangeHandler(field),
        extractValueFromEvent: undefined
    }
}