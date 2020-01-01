import FormRenderer from "../protocol/FormRenderer";
import FieldRenderer from "../protocol/FieldRenderer";
import Submitter from "../protocol/Submitter";
import Validator from "../protocol/Validator";
import Collector from "../protocol/Collector";
import { FormService } from "./FormProps";
import IForm from "./IForm";
import SimpleFormRenderer from "./SimpleFormRenderer";
import SimpleFieldRenderer from "./SimpleFieldRenderer";

export default class FormDefault {
    private static defaultFormRenderer: FormService<FormRenderer> | undefined;
    private static defaultFieldRenderer: FormService<FieldRenderer> | undefined;
    private static defaultSubmitter: FormService<Submitter> | undefined;
    private static defaultValidator: FormService<Validator> | undefined;
    private static defaultCollector: FormService<Collector> | undefined;


    public static setFormRenderer(formRenderer: FormService<FormRenderer>): void {
        this.defaultFormRenderer = formRenderer;
    }

    public static setFieldRenderer(fieldRenderer: FormService<FieldRenderer>): void {
        this.defaultFieldRenderer = fieldRenderer;
    }

    public static setSubmitter(submitter: FormService<Submitter>): void {
        this.defaultSubmitter = submitter;
    }

    public static setCollector(collector: FormService<Collector>): void {
        this.defaultCollector = collector;
    }

    public static setValidator(validator: FormService<Validator>): void {
        this.defaultValidator = validator;
    }

    public static getFormRenderer(): FormService<FormRenderer> {
        if (FormDefault.defaultFormRenderer) {
            return FormDefault.defaultFormRenderer;
        }
        return (form: IForm) => new SimpleFormRenderer(form);
    }

    public static getFieldRenderer(): FormService<FieldRenderer> {
        if (FormDefault.defaultFieldRenderer) {
            return FormDefault.defaultFieldRenderer;
        }

        return (form: IForm) => new SimpleFieldRenderer(form);
    }

    public static getSubmitter(): FormService<Submitter> | null {
        if (FormDefault.defaultSubmitter) {
            return FormDefault.defaultSubmitter;
        }
        return null;
    }

    public static getValidator(): FormService<Validator> | null {
        if (FormDefault.defaultValidator) {
            return FormDefault.defaultValidator;
        }
        return null;
    }

    public static getCollector(): FormService<Collector> | null {
        if (FormDefault.defaultCollector) {
            return FormDefault.defaultCollector;
        }

        return null;
    }

    public static unsetDefaults(): void {
        FormDefault.defaultCollector = undefined;
        FormDefault.defaultFieldRenderer = undefined;
        FormDefault.defaultFormRenderer = undefined;
        FormDefault.defaultSubmitter = undefined;
        FormDefault.defaultValidator = undefined;
    }

}