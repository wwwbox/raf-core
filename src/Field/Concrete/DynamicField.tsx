import Field from "./Field";
import DefaultDynamicFieldChangeHandler from "../../ChangeHandler/DefaultDynamicFieldChangeHandler";
import {FieldProps} from "../FieldProps";
import {DynamicFieldConfiguration, DynamicFieldExtra, IDynamicFieldExtra} from "../Configuration/DynamicFieldExtra";
import {DynamicFieldExtraConfigurationInitializer, IExtraConfigurationInitializer} from "./FieldStateInitializer";
import {FieldType} from "./FieldType";

export default class DynamicField extends Field<DynamicFieldConfiguration> {
    private readonly _extra: IDynamicFieldExtra;

    constructor(props: FieldProps) {
        super(props);
        const state = {...this.state};
        const defaultValue = props.value;
        state.value.value = defaultValue ? (
            Array.isArray(defaultValue) ? [...defaultValue] : [defaultValue]
        ) : [''];

        state.value.defaultChangeHandler = () => new DefaultDynamicFieldChangeHandler(this)
        this.state = state;
        this._extra = new DynamicFieldExtra(this, "extra");
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<DynamicFieldConfiguration> {
        return new DynamicFieldExtraConfigurationInitializer();
    }

    protected getDynamicValue(): any[] {
        return this.value().get();
    }

    public addInput = (startingValue: any = '') => {
        const value = [...this.getDynamicValue()];

        if (this.extra().getMaxInput() <= value.length) {
            this.extra().getOnMaxInputExceed()(this);
        }

        const newItemIndex = value.length;
        value.push(startingValue);
        this.value().set(value);

        this.extra().getOnItemAdded()(newItemIndex, this);

        if (this.extra().getMaxInput() == value.length) {
            this.extra().getOnInputFilled()(this);
        }
    };

    public removeInput = (index: number) => {
        const value = [...this.getDynamicValue()];
        const removedItem = value[index];
        value.splice(index, 1);
        this.value().set(value);
        this.extra().getOnItemRemoved()(removedItem, index, this);
    }

    extra(): IDynamicFieldExtra {
        return this._extra;
    }

    getType(): FieldType {
        return FieldType.DYNAMIC;
    }
}