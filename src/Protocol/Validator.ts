import { Service } from '@autofiy/autofiyable';
export interface Validator extends Service {
    validate(value: any, validationRules: any): boolean | string;
}

export default Validator;