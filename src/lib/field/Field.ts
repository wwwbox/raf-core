import {FieldProps} from "./FieldProps";
import FieldState from "./FieldState";
import IField from "./IField";
import {FieldMessageType} from "./FieldConfig";
import * as React from "react";
import FieldStateUtils from "./FieldStateUtils";
import Validator from "../protocol/Validator";
import FieldChangeHandler from "../protocol/FieldChangeHandler";
import DefaultFileFieldChangeHandler from "../ChangeHandler/DefaultFileFieldChangeHandler";
import DefaultFieldChangeHandler from "../ChangeHandler/DefaultFieldChangeHandler";

export default class Field<Props extends FieldProps = FieldProps, State extends FieldState = FieldState>
    extends React.Component<FieldProps, FieldState> implements IField {

    protected validator?: Validator;
    protected changeHandler: FieldChangeHandler;

    constructor(props: FieldProps) {
        super(props);
        this.state = new FieldStateUtils(props).getInitialState();
        this.validator = props.validator ? props.validator(this) : props.defaultValidator;
        this.changeHandler = props.changeHandler ? props.changeHandler(this) : this.getDefaultChangeHandler();
    }

    render() {
        return null;
    }

    protected getDefaultChangeHandler(): FieldChangeHandler {
        if (this.isFileField())
            return new DefaultFileFieldChangeHandler(this);
        return new DefaultFieldChangeHandler(this);
    }

    public clear(): void {
        this.setState({value: ''});
    }

    public getMessage(): undefined | string {
        return this.state.message;
    }

    public getMessageType(): FieldMessageType | undefined {
        return this.state.messageType;
    }

    public getState(): any {
        return this.state;
    }

    public getValidationRules(): any {
        return this.state.validationRules;
    }

    public getValue(): any {
        return this.state.value;
    }

    public isAsQuery(): boolean | undefined {
        return this.state.asQuery;
    }

    public isDisableOnLoading(): boolean | undefined {
        return this.state.disableOnLoading;
    }

    public isEscapeValidation(): boolean | undefined {
        return this.state.escapeValidation;
    }

    public isReadonly(): boolean | undefined {
        return this.state.readonly;
    }

    public isValid(): boolean {
        return this.state.isValid;
    }

    public isValidateOnChange(): boolean | undefined {
        return this.state.validateOnChange;
    }

    public setAsQuery(asQuery: boolean): void {
        this.setState({asQuery: asQuery});
    }

    public setDisableOnLoading(disableOnLoading: boolean): void {
        this.setState({disableOnLoading: disableOnLoading});
    }

    public setEscapeValidation(escapeValidation: boolean): void {
        this.setState({escapeValidation: escapeValidation});
    }

    public setMessage(message: string | undefined): void {
        this.setState({message: message});
    }

    public setMessageType(type: FieldMessageType | undefined): void {
        this.setState({messageType: type});
    }

    public setReadonly(readonly: boolean): void {
        this.setState({readonly: readonly});
    }

    setValue(value: any): void {
        this.setState({value: value});
    }

    public setValidateOnChange(validateOnChange: boolean): void {
        this.setState({validateOnChange: validateOnChange});
    }

    public setValidationRules(rules: any): void {
        this.setState({validationRules: rules});
    }

    public validate(): void {
        if (!this.validator)
            throw Error("NO VALIDATOR FOUND");
        const value = this.getValue();
        const rules = this.getValidationRules();
        const isValid = this.validator.validate(value, rules);
        if (isValid === true || isValid === '') {
            this.setState({isValid: true});
        }
        this.setState({isValid: false});
        this.props.onValidation && this.props.onValidation(isValid, this);
    }

    public error(error: boolean = true): void {
        this.setState({isValid: !error});
    }

    public changeState(newState: any): void {
        this.setState(newState);
    }

    public handleChange(e: any): void {
        this.changeHandler.handle();
    }

    public isFileField(): boolean {
        return false;
    }
}