import React from 'react';
import Form from "./lib/Form/Form";
import Validator from "./lib/Protocol/Validator";
import Submitter from "./lib/Protocol/Submitter";
import IForm from "./lib/Form/IForm";
import TextField from "./lib/DefaultElement/TextField";
import PasswordField from "./lib/DefaultElement/PasswordField";

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

function App() {
    return (
        <div>
            <h3>EXAMPLE</h3>
            <Form fields={[
                {as: TextField, name: 'username', label: 'Username'},
                {as: PasswordField, name: 'password', label: 'Password'}
            ]} services={{
                validator: () => new ThreeCharLengthValidator(),
                submitter: form => new DummySubmitter(form)
            }}
            />
        </div>
    );
}

export default App;