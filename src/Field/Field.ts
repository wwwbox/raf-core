import {FieldProps} from "./FieldProps";
import {FieldState} from "./FieldState";
import {IField} from "./IField";
import * as React from "react";
import {IForm} from "../Form/IForm";

import FieldStateInitializer, {
    DefaultExtraConfigurationInitializer,
    IExtraConfigurationInitializer
} from "./Concrete/FieldStateInitializer";

import {DefaultFieldValueService, FieldValueService} from "./Service/FieldValueService";
import {DefaultFieldValidator, FieldValidator} from "./Service/FieldValidator";
import {DefaultFieldUIService, FieldUIService} from "./Service/FieldUIService";
import {DefaultFieldCollector, FieldCollector} from "./Collecting/DefaultFieldCollector";
import {FieldExtra, IFieldExtraConfiguration} from "./Configuration/FieldExtra";
import {FieldType} from "./Concrete/FieldType";
import {DefaultFieldEventService, FieldEventService} from "./Service/FieldEventService";
import {ExtraRefresher, DefaultExtraRefresherService} from "./Service/ExtraRefresher";

export class Field<ExtraConfiguration = any> extends React.Component<FieldProps, FieldState<ExtraConfiguration>> implements IField<ExtraConfiguration> {

    protected _valueService: FieldValueService;
    protected _validator: FieldValidator;
    protected _uiService: FieldUIService;
    protected _collector: FieldCollector;
    protected _extra: IFieldExtraConfiguration<ExtraConfiguration>;
    protected _eventService: FieldEventService;
    protected _refresher: ExtraRefresher;
    private readonly initialState: FieldState;
    private isExtraUpdate: boolean = false;

    constructor(props: FieldProps) {
        super(props);
        this.state = this.initializeState();
        this.initialState = JSON.parse(JSON.stringify(this.state));
        this.getForm().fieldsManager().register(this);

        this._valueService = new DefaultFieldValueService(this, "value");
        this._validator = new DefaultFieldValidator(this, "validation");
        this._uiService = new DefaultFieldUIService(this, "ui");
        this._collector = new DefaultFieldCollector(this, "collecting");
        this._extra = new FieldExtra(this, "extra");
        this._eventService = new DefaultFieldEventService(this);
        this._refresher = this.props.refresher ?? new DefaultExtraRefresherService();
        this.state.value.extractValueFromEvent = this.state.value.extractValueFromEvent ?? (e => e.target.value);
        this.setupListeners();
    }

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

    collector(): FieldCollector {
        return this._collector;
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

    uiService(): FieldUIService {
        return this._uiService;
    }

    validator(): FieldValidator {
        return this._validator;
    }

    valueService(): FieldValueService {
        return this._valueService;
    }

    eventService(): FieldEventService {
        return this._eventService;
    }

    updateConfiguration<T>(key: keyof FieldState, newConfiguration: T, afterChange?: () => void): void {
        let payload: any = {[key]: {...newConfiguration}};
        this.setState(payload, () => afterChange?.());
    }

    protected setupListeners(): void {
        const thisListeners = this.getProps().listenThis ?? {};
        Object.keys(thisListeners).forEach(key => this.eventService().listenOnThis(key, thisListeners[key]));
    }

    protected initializeState(): any {
        return new FieldStateInitializer(this.props, this.getExtraConfigurationInitializer()).initialize();
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<ExtraConfiguration> {
        return new DefaultExtraConfigurationInitializer();
    }

    protected handleValueChange = (e: any): void => {
        this.valueService().getOnChangeHandler().handle(e);
    }

}


export default Field;