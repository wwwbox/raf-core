import Field from "../Field/Field";
export default class DummyField extends Field {
    render(): any;
}
export declare class DummyFileField extends Field {
    render(): any;
    isFileField(): boolean;
}
