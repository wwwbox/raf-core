import React from 'react';
import Form from "./lib/Form/Form";
import Validator from "./lib/Protocol/Validator";
import Submitter from "./lib/Protocol/Submitter";
import IForm from "./lib/Form/IForm";
import TextField from "./lib/TailwindComponent/TextField/TextField";
import {FieldMessageType} from "./lib/Field/FieldConfig";
import PasswordField from "./lib/TailwindComponent/PasswordField/PasswordField";
import SelectField from "./lib/TailwindComponent/SelectField/SelectField";
import CheckBoxField from "./lib/TailwindComponent/CheckboxField/CheckBoxField";
import RadioField from "./lib/TailwindComponent/RadioField/RadioField";
import TextArea from "./lib/TailwindComponent/TextArea/TextArea";
import FormDefault from "./lib/Form/FormDefault";
import TailwindFieldsRenderer from "./lib/TailwindComponent/Renderer/TailwindFieldsRenderer";

class ThreeCharLengthValidator implements Validator {
    validate(value: any, validationRules: any): boolean | string {
        const isValid = value && value.length === 3;
        if (isValid === true) return true;

        if (value && value.length > 3)
            return 'too long';
        else if (value && value.length < 3)
            return 'too short';

        return false;
    }
}


class DummySubmitter implements Submitter {
    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    getForm(): IForm {
        return this.form;
    }

    submit(): void {
        const collectedData = this.getForm().collect();
        console.log('data : ', collectedData.getData());
        console.log('queries : ', collectedData.getQuery());
        console.log('files : ', collectedData.getFiles());
    }
}

FormDefault.setFieldRenderer(form => new TailwindFieldsRenderer(form));

function TailwindExample() {
    return (
        <div>
            <h3>EXAMPLE</h3>
            <Form fields={[
                {
                    as: TextField,
                    inputProps: {autoComplete: "off"},
                    name: 'username',
                    label: 'Username',
                    labelClassName: 'w-24'
                },
                [
                    {as: TextField, name: 'A1'},
                    {as: TextField, name: 'A2'}
                ],
                {
                    as: TextField, name: 'name', label: 'Name', placeholder: 'Name...', labelClassName: 'w-24',
                    inputProps: {autoComplete: "off"}, onValidation: (result, field) => {
                        if (result === true) {
                            field.setMessage('CORRECT');
                            field.setMessageType(FieldMessageType.SUCCESS);
                        } else {
                            field.setMessage(result);
                            field.setMessageType(FieldMessageType.ERROR);
                        }
                    }
                },
                {as: PasswordField, name: 'password', label: 'Password', labelClassName: 'w-24'},
                {
                    as: SelectField,
                    name: 'type',
                    label: 'User Type',
                    options: [{value: 1, text: 'Admin'}, {value: 2, text: 'User'}],
                    labelClassName: 'w-24'
                },
                {
                    as: SelectField,
                    noSelectOption: false,
                    name: 'time',
                    label: 'Time',
                    options: ['AM', 'PM'],
                    horizontalLayout: true,
                    labelClassName: 'w-24'
                },
                {
                    as: RadioField,
                    name: 'shift',
                    label: 'Shift',
                    optionsDirection: "horizontal",
                    options: ['Night', 'Day'],
                    horizontalLayout: true,
                    labelClassName: 'w-24'
                },
                {
                    as: TextArea,
                    name: 'message',
                    label: 'Message',
                    labelClassName: 'w-24',
                    inputClassName: 'block w-full',
                    placeholder: 'Message',
                    skipDefaultWrapperClassName: true,
                    wrapperClassName: "flex flex-row items-start"
                },
                {name: 'conditionAgree', shouldValidate: false, as: CheckBoxField, label: 'Agree On Condition Terms ?'}
            ]} services={{
                validator: () => new ThreeCharLengthValidator(),
                submitter: form => new DummySubmitter(form)
            }}
            />
        </div>
    );
}

export default TailwindExample;