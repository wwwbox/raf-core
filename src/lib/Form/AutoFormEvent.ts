export default interface AutoFormEvent {
    type: string;
    payload?: any;
}


export enum PreDefinedEventType {
    ON_RESET = "ON_RESET",

    ON_VALIDATION = "ON_VALIDATION",
    ON_COLLECT = "ON_COLLECT",

    ON_START_LOADING = "ON_START_LOADING",
    ON_FAIL_LOADING = "ON_FAIL_LOADING",

    ON_SUCCESS_SUBMITTING = "ON_SUCCESS_SUBMITTING",
    ON_FAIL_SUBMITTING = "ON_FAIL_SUBMITTING",
    ON_START_SUBMITTING = "ON_START_SUBMITTING"
}