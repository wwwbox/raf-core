import {FieldChangeHandler} from "../Protocol/FieldChangeHandler";
import {IField} from "../Field/IField";
import {FieldEvents, GlobalEvents} from "../Event/DefaultEvents";

export class DefaultFieldChangeHandler implements FieldChangeHandler {
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

    protected getValue = (event: any) => {
        return this.getField().valueService().extractFromEvent(event);
    };

    protected changeValue = (event: any, value: any) => {
        const validateOnChange = this.getField().validator().config("validateOnChange") && !this.getField().validator().config("skipValidation")
        this.getField().valueService().set(value, validateOnChange, () => {
            this.notify();
        });
    };

    private shouldCancelChange = () => {
        return this.getField().uiService().isReadonly() || this.getField().uiService().shouldDisable();
    };

    private notify() {
        this.getField().eventService().emitOnThis(FieldEvents.CHANGE, {});
        this.getField().eventService().emit(GlobalEvents.VALUE_CHANGED, {field: this.getField()});
    }
}


export default DefaultFieldChangeHandler;