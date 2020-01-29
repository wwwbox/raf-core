import FieldChangeHandler from "../Protocol/FieldChangeHandler";
import IField from "../Field/IField";
export default class DefaultFieldChangeHandler implements FieldChangeHandler {
    private readonly field;
    constructor(field: IField);
    getField(): IField;
    handle(event: any): void;
    private shouldCancelChange;
    protected getValue: (event: any) => any;
    protected changeValue: (event: any, value: any) => void;
    protected notify: (value: any) => void;
}
