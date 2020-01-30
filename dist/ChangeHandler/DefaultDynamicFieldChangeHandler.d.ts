import DefaultFieldChangeHandler from "./DefaultFieldChangeHandler";
export default class DefaultDynamicFieldChangeHandler extends DefaultFieldChangeHandler {
    protected getValue: (event: any) => any;
}
