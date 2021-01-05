import {FieldProps} from "../FieldProps";
import {FieldState} from "../FieldState";
import {IField} from "../IField";
import * as React from "react";
import {IForm} from "../../Form/IForm";

import FieldStateInitializer, {
    DefaultExtraConfigurationInitializer,
    IExtraConfigurationInitializer
} from "./FieldStateInitializer";

import {FieldValue, IFieldValue} from "../Value/FieldValue";
import {FieldValidation, IFieldValidation} from "../Validation/FieldValidation";
import {FieldUI, IFieldUI} from "../UI/FieldUI";
import {FieldCollecting, IFieldCollecting} from "../Collecting/FieldCollecting";
import {FieldExtra, IFieldExtraConfiguration} from "../Configuration/FieldExtra";
import {FieldType} from "./FieldType";
import {FieldEvent, IFieldEvent} from "../FieldEvent/FieldEvent";
import {ExtraRefresher, ExtraRefresherBase} from "../ExtraRefresher";

export class Field<ExtraConfiguration = any> extends React.Component<FieldProps, FieldState<ExtraConfiguration>> implements IField<ExtraConfiguration> {

    protected _value: IFieldValue;
    protected _validation: IFieldValidation;
    protected _ui: IFieldUI;
    protected _collecting: IFieldCollecting;
    protected _extra: IFieldExtraConfiguration<ExtraConfiguration>;
    protected _event: IFieldEvent;
    protected _refresher: ExtraRefresher;
    private readonly initialState: FieldState;

    constructor(props: FieldProps) {
        super(props);
        this.state = this.initializeState();
        this.initialState = JSON.parse(JSON.stringify(this.state));
        this.getForm().fields().register(this);

        this._value = new FieldValue(this, "value");
        this._validation = new FieldValidation(this, "validation");
        this._ui = new FieldUI(this, "ui");
        this._collecting = new FieldCollecting(this, "collecting");
        this._extra = new FieldExtra(this, "extra");
        this._event = new FieldEvent(this);
        this._refresher = this.props.refresher ?? new ExtraRefresherBase();
        this.state.value.extractValueFromEvent = this.state.value.extractValueFromEvent ?? (e => e.target.value);
        this.setupListeners();
    }

    private isExtraUpdate: boolean = false;

    componentDidUpdate(prevProps: Readonly<FieldProps>, prevState: Readonly<FieldState<ExtraConfiguration>>, snapshot?: any) {
        if (this.isExtraUpdate) {
            this.isExtraUpdate = false;
            return;
        }
        if (this._refresher.refresh(this)) {
            this.isExtraUpdate = true;
            this.forceUpdate();
            this._extra.refreshConfiguration();
        }
    }

    render(): any {
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

    getConfiguration<T>(key: keyof FieldState): T {
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

    validation(): IFieldValidation {
        return this._validation;
    }

    value(): IFieldValue {
        return this._value;
    }

    event(): IFieldEvent {
        return this._event;
    }

    updateConfiguration<T>(key: keyof FieldState, newConfiguration: T, afterChange?: () => void): void {
        let payload: any = {[key]: {...newConfiguration}};
        this.setState(payload, () => afterChange?.());
    }

    protected setupListeners(): void {
        const globalListeners = this.getProps().listen ?? {};
        const thisListeners = this.getProps().listenThis ?? {};
        Object.keys(globalListeners).forEach(key => this.event().listen(key, globalListeners[key]));
        Object.keys(thisListeners).forEach(key => this.event().listenOnThis(key, thisListeners[key]));
    }

    protected initializeState(): any {
        return new FieldStateInitializer(this.props, this.getExtraConfigurationInitializer()).initialize();
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<ExtraConfiguration> {
        return new DefaultExtraConfigurationInitializer();
    }

    protected handleValueChange = (e: any): void => {
        this.value().getOnChangeHandler().handle(e);
    }

}


export default Field;