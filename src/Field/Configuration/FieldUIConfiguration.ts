export interface FieldUIConfiguration {
    readonly: boolean;
    message: string;
    messageType: FieldMessageType;
    disableOnLoading: boolean;
    disableOnFormLoading: boolean;
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
