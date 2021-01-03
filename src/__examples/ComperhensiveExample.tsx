import React, {Component} from 'react';
import Form from "../Form/Form";
import DefaultTextField from "../DefaultElement/DefaultTextField";
import IForm from "../Form/IForm";
import DefaultSelectField from "../DefaultElement/DefaultSelectField";
import {GlobalEvents} from "../Event/DefaultEvents";
import DefaultCheckboxField from "../DefaultElement/DefaultCheckboxField";
import DefaultArrayTextField from "../DefaultElement/DefaultArrayTextField";
import DefaultTextAreaField from "../DefaultElement/DefaultTextAreaField";
import DefaultRadioField from "../DefaultElement/DefaultRadioField";
import DefaultPasswordField from "../DefaultElement/DefaultPasswordField";


class ComprehensiveExample extends Component<any, any> {
    private form: IForm | null = null;

    constructor(props: Readonly<any> | any) {
        super(props);
        this.state = {
            label: 'X',
            options: [{label: 'Option 1', value: 'x'}, {label: 'Option 2', value: 'y'}]
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({options: this.state.options.concat({label: 'Option 3', value: 'z'})});
        }, 1000);

        setTimeout(() => {
            this.setState({label: 'Y'});
        }, 2000)
    }

    render() {
        return (
            <div>
                <Form ref={ref => this.form = ref}
                      fields={[
                          {as: DefaultSelectField, name: 'select', extra: {options: this.state.options}},
                          {as: DefaultTextField, name: 'name', extra: {label: this.state.label}},
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
                              url: "http://google.com"
                          }
                      }}/>

                <button
                    onClick={() => console.log(this.form?.fields().getAllRegistered().map(f => f.value().get()))}>Print
                    Value
                </button>
            </div>
        );
    }

}

export default ComprehensiveExample;

