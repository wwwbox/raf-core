import FieldChangeHandler from "../Protocol/FieldChangeHandler";
import IField from "../Field/IField";

export default class DefaultFieldChangeHandler implements FieldChangeHandler {
    private readonly field: IField;

    constructor(field: IField) {
        this.field = field;
    }

    getField(): IField {
        return this.field;
    }

    handle(event: any): void {
        if (this.shouldCancelChange()) {
            return;
        }

        if (this.getField().getProps().onChange) {
            this.getField().getProps().onChange!(event, this.getField());
            return;
        }

        const value = this.getValue(event);
        this.changeValue(event, value);
        this.notify(value);
    }

    private shouldCancelChange = () => {
        return this.getField().isReadonly() || (
            this.getField().isDisableOnLoading() && this.getField().isLoading()
        );
    };

    protected getValue = (event: any) => {
        return this.getField().extractValueFromChangeEvent(event);
    };

    protected changeValue = (event: any, value: any) => {
        const validateOnChange = this.getField().isValidateOnChange() && this.getField().shouldValidate();
        this.getField().setValue(value, validateOnChange, () => {
            this.getField().getProps().afterChange && this.getField().getProps().afterChange!(event, value, this.getField())
        });
    };

    protected notify = (value: any) => {
        this.getField().getForm().onAnyValueChanged(this.getField().getName(), value, this.getField());
    };
}