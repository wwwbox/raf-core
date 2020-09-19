import FieldChangeHandler from "../Protocol/FieldChangeHandler";
import IField from "../Field/IField";
import {FieldEvents, GlobalEvents} from "../Event/DefaultEvents";

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
        const value = this.getValue(event);
        this.changeValue(event, value);
    }

    private shouldCancelChange = () => {
        return this.getField().ui().isReadonly() ||
            (
                this.getField().ui().isDisableOnLoading() && this.getField().ui().isLoading()
            );
    };

    protected getValue = (event: any) => {
        return this.getField().value().extractFromEvent(event);
    };

    protected changeValue = (event: any, value: any) => {
        const validateOnChange = this.getField().validation().config("validateOnChange") && !this.getField().validation().config("skipValidation")
        this.getField().value().set(value, validateOnChange, () => {
            this.notify();
        });
    };

    private notify() {
        this.getField().event().emitOnThis(FieldEvents.CHANGE, {});
        this.getField().event().emit(GlobalEvents.VALUE_CHANGED, {field: this.getField()});
    }
}