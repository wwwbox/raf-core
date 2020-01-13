import {FormService} from "./FormProps";
import IForm from "./IForm";

export default class FromServiceSetup {
    public static getDefaultServiceOrPassed<T>(form: IForm, passed: FormService<T> | undefined, defaultService?: FormService<T> | null): T {
        if (passed) {
            return passed(form);
        }
        if (defaultService) {
            return defaultService(form);
        }
        throw Error('CANNOT FIND FORM SERVICE');
    }
}