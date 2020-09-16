import FormDefault from "../../Form/FormDefault";
import SimpleFormRenderer from "../../DefaultElement/SimpleFormRenderer";
import SimpleFieldRenderer from "../../DefaultElement/SimpleFieldRenderer";

describe('from default', () => {


    it('should set/get/unset Form renderer', () => {
        FormDefault.unsetDefaults();
        const service: any = {};
        const formService: any = () => service;
        FormDefault.setFormRenderer(formService);
        expect(FormDefault.getFormRenderer()).toBe(formService);
        expect(FormDefault.getFormRenderer()(null as any)).toBe(service);
    });

    it('should get default Form renderer when no defaults set', () => {
        FormDefault.unsetDefaults();
        const formRendererService = FormDefault.getFormRenderer();
        const formRenderer = formRendererService(null as any);
        expect(formRenderer).toBeInstanceOf(SimpleFormRenderer);
    });

    it('should get/set Field renderer', () => {
        FormDefault.unsetDefaults();
        const service: any = {};
        const formService: any = () => service;
        FormDefault.setFieldRenderer(formService);
        expect(FormDefault.getFieldRenderer()).toBe(formService);
        expect(FormDefault.getFieldRenderer()(null as any)).toBe(service);
    });


    it('should return simple filed render when no default Field renderer set', () => {
        FormDefault.unsetDefaults();
        const service = FormDefault.getFieldRenderer();
        const renderer = service(null as any);
        expect(renderer).toBeInstanceOf(SimpleFieldRenderer);
    });

    it('should get/set collector', () => {
        FormDefault.unsetDefaults();
        expect(FormDefault.getCollector()).toBe(null);
        const collector: any = {};
        const formService = () => collector;
        FormDefault.setCollector(formService);
        expect(FormDefault.getCollector()).toBe(formService);
        const s = FormDefault.getCollector();
        const c = s ? s(null as any) : null;
        expect(c).toBe(collector);
    });


    it('should get/set validator', () => {
        FormDefault.unsetDefaults();
        expect(FormDefault.getValidator()).toBe(null);
        const validator: any = {};
        const formService = () => validator;
        FormDefault.setValidator(formService);
        expect(FormDefault.getValidator()).toBe(formService);
        const s = FormDefault.getValidator();
        const v = s ? s(null as any) : null;
        expect(v).toBe(validator);
    });


    it('should get/set submitter', () => {
        FormDefault.unsetDefaults();
        expect(FormDefault.getSubmitter()).toBe(null);
        const submitter: any = {};
        const formService = () => submitter;
        FormDefault.setSubmitter(formService);
        expect(FormDefault.getSubmitter()).toBe(formService);
        const s = FormDefault.getSubmitter();
        const sb = s ? s(null as any) : null;
        expect(sb).toBe(submitter);
    });


});