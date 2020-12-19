import { Service } from '@autofiy/autofiyable';
export default interface Validator extends Service{
    validate(value : any , validationRules : any): boolean | string;
}