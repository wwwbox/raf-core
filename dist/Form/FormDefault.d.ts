import FormRenderer from "../Protocol/FormRenderer";
import FieldsRenderer from "../Protocol/FieldsRenderer";
import Submitter from "../Protocol/Submitter";
import Validator from "../Protocol/Validator";
import Collector from "../Protocol/Collector";
import { FormService } from "./FormProps";
export default class FormDefault {
    private static defaultFormRenderer;
    private static defaultFieldRenderer;
    private static defaultSubmitter;
    private static defaultValidator;
    private static defaultCollector;
    static setFormRenderer(formRenderer: FormService<FormRenderer>): void;
    static setFieldRenderer(fieldRenderer: FormService<FieldsRenderer>): void;
    static setSubmitter(submitter: FormService<Submitter>): void;
    static setCollector(collector: FormService<Collector>): void;
    static setValidator(validator: FormService<Validator>): void;
    static getFormRenderer(): FormService<FormRenderer>;
    static getFieldRenderer(): FormService<FieldsRenderer>;
    static getSubmitter(): FormService<Submitter> | null;
    static getValidator(): FormService<Validator> | null;
    static getCollector(): FormService<Collector> | null;
    static unsetDefaults(): void;
}
