import DefaultFieldChangeHandler from "./DefaultFieldChangeHandler";

export default class DefaultDynamicFieldChangeHandler extends DefaultFieldChangeHandler {

    protected getValue = (event: any) => {
        let value = this.getField().value().extractFromEvent(event);
        const fullValue = [...this.getField().value().get()];
        fullValue[event.index] = value;
        return fullValue;
    }



}