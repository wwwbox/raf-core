import FormRenderer from "../Protocol/FormRenderer";
import FieldRenderer from "../Protocol/FieldRenderer";
import Submitter from "../Protocol/Submitter";
import Validator from "../Protocol/Validator";
import IForm from "./IForm";
import {NotEmptyValidator} from "../Defaults/Services/Validator";
import {FormService} from "./FormService";
import {DefaultEventNameMaker, IEventNameMaker} from "../Event/IEventNameMaker";
import {DefaultFormRenderer} from "../Defaults/Services/DefaultFormRenderer";
import DefaultFieldRenderer from "../Defaults/Services/DefaultFieldRenderer";

export default class FormDefault {
    private static defaultRenderer: FormService<FormRenderer> | undefined;
    private static defaultSubmitter: FormService<Submitter> | undefined;
    private static defaultValidator: FormService<Validator> | undefined;
    private static defaultEventNameMaker: FormService<IEventNameMaker> | null;
    private static defaultFieldRenderer: FormService<FieldRenderer> | null;


    public static setFormRenderer(formRenderer: FormService<FormRenderer>): void {
        this.defaultRenderer = formRenderer;
    }

    public static setSubmitter(submitter: FormService<Submitter>): void {
        this.defaultSubmitter = submitter;
    }

    public static setEventNameMaker(nameMaker: FormService<IEventNameMaker>): void {
        this.defaultEventNameMaker = nameMaker;
    }

    public static setFieldRenderer(renderer: FormService<FieldRenderer>): void {
        this.defaultFieldRenderer = renderer;
    }

    public static setValidator(validator: FormService<Validator>): void {
        this.defaultValidator = validator;
    }

    public static getFormRenderer(): FormService<FormRenderer> {
        return FormDefault.defaultRenderer ?? ((form: IForm) => new DefaultFormRenderer(form));
    }

    public static getSubmitter(): FormService<Submitter> | null {
        return FormDefault.defaultSubmitter ?? null;
    }

    public static getValidator(): FormService<Validator> {
        return FormDefault.defaultValidator ?? (() => new NotEmptyValidator());
    }

    static getEventNameMaker(): FormService<IEventNameMaker> {
        return FormDefault.defaultEventNameMaker ?? (() => new DefaultEventNameMaker());
    }

    static getFieldRenderer(): FormService<FieldRenderer> {
        return FormDefault.defaultFieldRenderer ?? (form => new DefaultFieldRenderer(form));
    }
}