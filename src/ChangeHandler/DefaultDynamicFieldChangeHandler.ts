import DefaultFieldChangeHandler from "./DefaultFieldChangeHandler";

export default class DefaultDynamicFieldChangeHandler extends DefaultFieldChangeHandler {

    protected getValue = (event: any) => {
        let value = this.getField().extractValueFromChangeEvent(event);
        const fullValue = this.getField().getValue();
        fullValue[event.index] = value;
        return fullValue;
    }

}