import IField from "../field/IField";

export default interface FieldChangeHandler {
    handle(): void;

    getField(): IField;
}