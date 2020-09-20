import IForm from "./IForm";
import IField from "../Field/IField";
import {EventCallback} from "../Event/EventType";
import {FieldOptions} from "../Field/FieldProps";
import {FormServices} from "./FormService";

export default interface FormProps {
    fields: (FieldOptions | FieldOptions[])[],
    services?: FormServices;

    listen?: {
        [eventName: string]: EventCallback;
    },

    onAnyValueChanged?: (key: string, value: any, field: IField, form: IForm) => void,
    initialValues?: any,
    allowSubmitWhenNotValid?: boolean;
    extra?: any;
}



