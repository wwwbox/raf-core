import {Validator} from "../../Protocol/Validator";
import {IField} from "../IField";
import {FieldMessageType} from "./FieldUIConfiguration";

export interface FieldValidationConfiguration {
    validateOnChange: boolean;
    rules: any;
    skipValidation: boolean;
    valid: boolean;
    validator: ((field: IField) => Validator) | null;
    updateMessageOnValidationFail: boolean,
    onFailMessageType: FieldMessageType;
}