import {IForm} from "./IForm";
import {IField} from "../Field/IField";
import {EventCallback} from "../Event/EventType";
import {FieldOptions} from "../Field/FieldProps";
import {AutofiyableProps} from "@autofiy/autofiyable";

export interface FormProps extends AutofiyableProps {
    fields: (FieldOptions | FieldOptions[])[],

    listen?: {
        [eventName: string]: EventCallback;
    },

    onAnyValueChanged?: (key: string, value: any, field: IField, form: IForm) => void,
    initialValues?: any,
    allowSubmitWhenNotValid?: boolean;
}

export default FormProps;