import IField from "../Field/IField";

export interface FieldChangeHandler {
    handle(event: any): void;

    getField(): IField;
}

export default FieldChangeHandler;