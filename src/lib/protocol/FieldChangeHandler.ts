import IField from "../field/IField";

export default interface FieldChangeHandler {
    handle(event: any): void;

    getField(): IField;
}