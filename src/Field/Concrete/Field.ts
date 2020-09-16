import {FieldProps} from "../FieldProps";
import FieldState from "../FieldState";
import IField from "./../IField";
import * as React from "react";
import IForm from "../../Form/IForm";

import FieldStateInitializer, {
    DefaultExtraConfigurationInitializer,
    IExtraConfigurationInitializer
} from "./FieldStateInitializer";

import {FieldValue, IFieldValue} from "../Value/FieldValue";
import {FieldValidation, IFieldValidation} from "../Validation/FieldValidation";
import {FieldUI, IFieldUI} from "../UI/FieldUI";
import {EventCallback} from "../../Protocol/EventType";
import {FieldCollecting, IFieldCollecting} from "../Collecting/FieldCollecting";
import {FieldExtra, IFieldExtraConfiguration} from "../Configuration/FieldExtra";
import {FieldType} from "./FieldType";

export default class Field<ExtraConfiguration = any> extends React.Component<FieldProps, FieldState> implements IField<ExtraConfiguration> {

    private readonly _value: IFieldValue;
    private readonly _validation: IFieldValidation;
    private readonly _ui: IFieldUI;
    private readonly _collecting: IFieldCollecting;
    private readonly _extra: IFieldExtraConfiguration<ExtraConfiguration>;

    constructor(props: FieldProps) {
        super(props);
        this.state = this.initializeState();
        this.getForm().registerField(this);

        this._value = new FieldValue(this, "value");
        this._validation = new FieldValidation(this, "validation");
        this._ui = new FieldUI(this, "ui");
        this._collecting = new FieldCollecting(this, "collecting");
        this._extra = new FieldExtra(this, "extra");
    }

    private initializeState = (): FieldState => {
        return new FieldStateInitializer(this.props, this.getExtraConfigurationInitializer()).initialize();
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<ExtraConfiguration> {
        return new DefaultExtraConfigurationInitializer();
    }

    render() {
        return null;
    }


    public getForm = (): IForm => {
        return this.props.form;
    };

    public getProps = (): FieldProps => {
        return this.props;
    };

    collecting(): IFieldCollecting {
        return this._collecting;
    }


    extra(): IFieldExtraConfiguration<ExtraConfiguration> {
        return this._extra;
    }

    getConfiguration<T>(key: string): T {
        return this.state[key] as any;
    }

    getName(): string {
        return this.getProps().name;
    }

    getType(): FieldType {
        return FieldType.NORMAL;
    }

    ui(): IFieldUI {
        return this._ui;
    }

    updateConfiguration<T>(key: string, newConfiguration: T, afterChange?: () => void): void {
        this.setState({[key]: {...newConfiguration}});
    }

    validation(): IFieldValidation {
        return this._validation;
    }

    value(): IFieldValue {
        return this._value;
    }

    listen(type: string, callback: EventCallback): void {

    }

}