import React, {Component} from 'react';
import Form from "../Form/Form";
import DefaultTextField from "../DefaultElement/DefaultTextField";
import DefaultPasswordField from "../DefaultElement/DefaultPasswordField";
import IForm from "../Form/IForm";
import DefaultRadioField from "../DefaultElement/DefaultRadioField";
import DefaultSelectField from "../DefaultElement/DefaultSelectField";
import DefaultTextAreaField from "../DefaultElement/DefaultTextAreaField";
import DefaultArrayTextField from "../DefaultElement/DefaultArrayTextField";
import DefaultCheckboxField from "../DefaultElement/DefaultCheckboxField";


export class ComprehensiveExample extends Component {
    private form: IForm | null = null;

    render() {
        return (
            <div>
                <Form ref={ref => this.form = ref} fields={[
                    {as: DefaultTextField, name: 'name', extra: {label: 'Name'}},
                    {as: DefaultTextField, name: 'username', extra: {label: 'Username'}},
                    {as: DefaultPasswordField, name: 'password', extra: {label: 'Password'}},
                    {
                        as: DefaultRadioField, name: 'type', extra: {
                            label: 'Type',
                            options: [{label: 'Admin', value: 1}, {label: 'User', value: 2}]
                        }
                    },
                    {
                        as: DefaultSelectField, name: 'country', extra: {
                            label: 'Country',
                            options: [{label: 'Iraq', value: 1}, {label: 'Japan', value: 2}]
                        }
                    },
                    {
                        as: DefaultTextAreaField, name: 'message', extra: {
                            label: 'Message...'
                        }
                    },
                    {
                        as: DefaultArrayTextField, name: 'friends', extra: {
                            label: 'Enter your friends names'
                        }
                    },
                    {as: DefaultCheckboxField, name: 'policy_agreement', extra: {label: 'I Accept The Policy'}},
                ]} extra={{
                    submitOptions: {
                        url: "http://google.com",
                        method: "get"
                    }
                }}/>
                <button onClick={() => {
                    const win: any = window;
                    win.raf = this.form;
                }}>
                    SET GLOBAL FORM INSTANCE
                </button>
            </div>
        );
    }
}
