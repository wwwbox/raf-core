import IField from "../Field/IField";

export default interface FieldChangeHandler {
    handle(event: any): void;

    getField(): IField;
}