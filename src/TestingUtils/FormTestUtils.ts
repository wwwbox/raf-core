import {ServiceProvider} from '@autofiy/autofiyable';
import IField from "../Field/IField";
import {FormFieldsManager} from "../Form/Services/FormFieldsManager";
import {mock} from "jest-mock-extended";
import IForm from "../Form/IForm";
import {FieldType} from "../Field/FieldType";
import {DefaultServices} from '../Form/ServicesConfiguration';

export class FormTestUtils {
    public static makeForm(fields: IField[] = [], mockImplementation: any = {}) {
        const form: IForm = mock<IForm>({
            fieldsManager(): FormFieldsManager {
                return mock<FormFieldsManager>({
                    getAllRegistered(): IField[] {
                        return fields;
                    }
                })
            },
            ...mockImplementation
        });
        form.getServiceProvider = () => new ServiceProvider(form);
        form.getDefaultServices = () => DefaultServices;
        return form;
    }


    public static createMockedField(name: string, type: FieldType = FieldType.NORMAL, implementation: any = {}): IField {
        return mock<IField>({
            getType(): FieldType {
                return type;
            },
            getName(): string {
                return name;
            },
            ...implementation
        });
    }
}