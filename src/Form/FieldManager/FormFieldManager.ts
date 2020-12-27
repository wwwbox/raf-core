import {Service} from '@autofiy/autofiyable';
import {FieldOptions} from "../../Field/FieldProps";
import {IField} from "../../Field/IField";
import {IForm} from "../IForm";

export interface IFormFieldManager extends Service {
    getFieldsOptions(): (FieldOptions | FieldOptions[])[];

    register(field: IField): void;

    getAllRegistered(): IField[];

    getRegistered(name: string): IField | null;
}

export class FormFieldManager implements IFormFieldManager {

    private readonly form: IForm;
    private readonly registered: IField[];

    constructor(form: IForm) {
        this.form = form;
        this.registered = [];
    }

    getAllRegistered(): IField[] {
        return this.registered;
    }

    getFieldsOptions(): (FieldOptions | FieldOptions[])[] {
        return this.form.getProps().fields;
    }

    getRegistered(name: string): IField | null {
        for (let field of this.getAllRegistered()) {
            if (field.getName() === name)
                return field;
        }
        return null;
    }

    register(field: IField): void {
        this.registered.push(field);
    }

}