export default interface AutoFormEvent {
    type: string;
    payload?: any;
}
export declare enum PreDefinedEventType {
    ON_RESET = "ON_RESET",
    ON_START_LOADING = "ON_START_LOADING",
    ON_END_LOADING = "ON_END_LOADING",
    ON_SUCCESS_SUBMITTING = "ON_SUCCESS_SUBMITTING",
    ON_FAIL_SUBMITTING = "ON_FAIL_SUBMITTING",
    ON_START_SUBMITTING = "ON_START_SUBMITTING"
}
