import FormServiceSetup from "../../lib/Form/FormServiceSetup";
import {FormService} from "../../lib/Form/FormProps";

describe('from service setup', () => {

    it('should return passed service', function () {
        const formService: FormService<any> = (form: any) => ({form: form});
        const formInstance: any = {};
        const service = FormServiceSetup.getDefaultServiceOrPassed(formInstance, formService, undefined);
        expect(service).toEqual({form: formInstance});
    });


    it('should should return default service', function () {
        const defaultService: FormService<any> = (form: any) => ({form: form});
        const formInstance: any = {};
        const service = FormServiceSetup.getDefaultServiceOrPassed(formInstance, undefined, defaultService);
        expect(service).toEqual({form: formInstance});
    });

    it('should throw error when no service available', function () {
        expect(() => {
            FormServiceSetup.getDefaultServiceOrPassed({} as any, undefined, undefined);
        }).toThrowError();
    });

});