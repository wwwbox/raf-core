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
        if (this.getField().isReadonly() || (
            this.getField().isDisableOnLoading() && this.getField().isLoading()
        )) {
            return;
        }

        if (this.getField().getProps().onChange) {
            this.getField().getProps().onChange!(event, this.getField());
            return;
        }

        const value = this.getField().extractValueFromChangeEvent(event);
        this.getField().setValue(value, true, () => {
            this.getField().getProps().afterChange && this.getField().getProps().afterChange!(event, value, this.getField())
        });

        this.getField().getForm().onAnyValueChanged(this.getField().getName() , value  , this.getField());
    }

}