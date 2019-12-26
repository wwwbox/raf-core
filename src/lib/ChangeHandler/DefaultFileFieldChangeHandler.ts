import FieldChangeHandler from "../protocol/FieldChangeHandler";
import IField from "../field/IField";

export default class DefaultFileFieldChangeHandler implements FieldChangeHandler {
    private readonly field: IField;

    constructor(field: IField) {
        this.field = field;
    }

    getField(): IField {
        return this.field;
    }

    handle(event: any): void {
        //TODO : implementation
    }

}