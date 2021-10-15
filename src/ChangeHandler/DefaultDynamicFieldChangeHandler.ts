import {DefaultFieldChangeHandler} from "./DefaultFieldChangeHandler";

export class DefaultDynamicFieldChangeHandler extends DefaultFieldChangeHandler {

    protected getValue = (event: any) => {
        let value = this.getField().valueService().extractFromEvent(event);
        const fullValue = [...this.getField().valueService().get()];
        fullValue[event.index] = value;
        return fullValue;
    }

}

export default DefaultDynamicFieldChangeHandler;