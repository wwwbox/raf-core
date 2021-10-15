import {FieldMessageType, FieldUIConfiguration} from "../FieldUIConfiguration";

export function getDefaultFieldUIConfiguration(): FieldUIConfiguration {
    return {
        disabled: false,
        message: '',
        messageType: FieldMessageType.INFO,
        disableOnLoading: false,
        disableOnFormLoading: true,
        hidden: false,
        loading: false,
        readonly: false
    }
}
