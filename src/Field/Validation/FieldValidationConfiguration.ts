import Validator from "../../Protocol/Validator";
import IField from "../IField";

export interface FieldValidationConfiguration {
    validateOnChange: boolean;
    rules: any;
    skipValidation: boolean;
    valid: boolean;
    validator: ((field : IField) => Validator) | null;
}

export const DEFAULT_FIELD_VALIDATION_CONFIGURATION: FieldValidationConfiguration = {
    rules: {},
    skipValidation: false,
    valid: true,
    validateOnChange: true,
    validator: null
}