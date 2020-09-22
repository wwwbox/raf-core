import IField from "../Field/IField";
import {IFormFieldManager} from "../Form/FieldManager/FormFieldManager";
import {mock} from "jest-mock-extended";
import IForm from "../Form/IForm";

export function tfGetFields(fields: IField[]): IFormFieldManager {
    return mock<IFormFieldManager>({
        getAllRegistered(): IField[] {
            return fields;
        }
    });
}

export function tfGetForm(fields: IField[], mockImplementation: any = {}): IForm {
    return mock<IForm>({
        fields(): IFormFieldManager {
            return tfGetFields(fields);
        },
        ...mockImplementation
    });
}