export function getDefaultDynamicFieldConfiguration() {
    return {
        onItemRemoved: () => undefined,
        onItemAdded: () => undefined,
        onInputFilled: () => undefined,
        onMaxInputExceed: () => undefined,
        maxInput: 100
    }
}