import FieldChangeHandler from "../Protocol/FieldChangeHandler";
import IField from "../Field/IField";

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