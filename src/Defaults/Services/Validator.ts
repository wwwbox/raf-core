import { Validator } from "../../Protocol/Validator";

export class NotEmptyValidator implements Validator {
    validate(value: any, validationRules: any): boolean | string {
        return value !== null && value !== undefined && value !== '';
    }
}