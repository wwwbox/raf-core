export default interface Validator {
    validate(value : any , validationRules : any): boolean | string;
}