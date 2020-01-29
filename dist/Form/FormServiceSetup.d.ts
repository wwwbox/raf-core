import { FormService } from "./FormProps";
import IForm from "./IForm";
export default class FromServiceSetup {
    static getDefaultServiceOrPassed<T>(form: IForm, passed: FormService<T> | undefined, defaultService?: FormService<T> | null): T;
}
