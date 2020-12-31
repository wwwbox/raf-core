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
import {Counter} from "./Counter";
import {GlobalEvents} from "../Event/DefaultEvents";


class ComprehensiveExample extends Component {
    private form: IForm | null = null;

    render() {
        return (
            <div>
                <h1>Test</h1>
                <Counter/>
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
                ]}
                      listen={{
                          [GlobalEvents.SUBMIT_SUCCEEDED]: () => alert("AJAX Succeed"),
                          [GlobalEvents.SUBMIT_FAILED]: () => alert("AJAX Failed"),
                          [GlobalEvents.SUBMIT_COMPLETED]: () => alert("AJAX Completed"),
                          [GlobalEvents.SUBMIT_START]: () => console.log("AJAX Start")
                      }}
                      extra={{
                          submitOptions: {
                              url: "http://google.com",
                              method: "get"
                          }
                      }}/>
            </div>
        );
    }

}

export default ComprehensiveExample;

