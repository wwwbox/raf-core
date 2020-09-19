export interface FieldUIConfiguration {
    readonly: boolean;
    message: string;
    messageType: FieldMessageType;
    disableOnLoading: boolean;
    hidden: boolean;
    disabled: boolean;
    loading: boolean;
}

export enum FieldMessageType {
    ERROR,
    SUCCESS,
    INFO,
    WARNING
}


export function getDefaultFieldUIConfiguration(): FieldUIConfiguration {
    return {
        disabled: false,
        message: '',
        messageType: FieldMessageType.INFO,
        disableOnLoading: false,
        hidden: false,
        loading: false,
        readonly: false
    }
}

