import IField from "../Field/IField";
import {IFormFieldManager} from "../Form/FieldManager/FormFieldManager";
import {mock} from "jest-mock-extended";
import IForm from "../Form/IForm";
import {FieldType} from "../Field/Concrete/FieldType";

export class FormTestUtils {
    public static makeForm(fields: IField[] = [], mockImplementation: any = {}) {
        return mock<IForm>({
            fields(): IFormFieldManager {
                return mock<IFormFieldManager>({
                    getAllRegistered(): IField[] {
                        return fields;
                    }
                })
            },
            ...mockImplementation
        });
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