import Field from "./Field";
import DefaultDynamicFieldChangeHandler from "../../ChangeHandler/DefaultDynamicFieldChangeHandler";
import {FieldProps} from "../FieldProps";
import {DynamicFieldConfiguration, DynamicFieldExtra, IDynamicFieldExtra} from "../Configuration/DynamicFieldExtra";
import {DynamicFieldExtraConfigurationInitializer, IExtraConfigurationInitializer} from "./FieldStateInitializer";
import {FieldType} from "./FieldType";

export default class DynamicField<ExtraConfiguration extends DynamicFieldConfiguration = DynamicFieldConfiguration> extends Field<ExtraConfiguration> {

    constructor(props: FieldProps) {
        super(props);
        const defaultValue = props.value;

        this.state.value.value = defaultValue ? (
            Array.isArray(defaultValue) ? [...defaultValue] : [defaultValue]
        ) : [''];
        this.state.value.defaultChangeHandler = () => new DefaultDynamicFieldChangeHandler(this);

        this._extra = new DynamicFieldExtra(this, "extra");
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<ExtraConfiguration> {
        return new DynamicFieldExtraConfigurationInitializer() as IExtraConfigurationInitializer<ExtraConfiguration>;
    }

    protected getDynamicValue(): any[] {
        return this.value().get();
    }

    public addInput = (startingValue: any = '') => {
        const value = [...this.getDynamicValue()];
        if (this.extra().getMaxInput() <= value.length) {
            this.extra().getOnMaxInputExceed()(this);
            return;
        }
        this.addValue(value, startingValue);
        if (this.extra().getMaxInput() == value.length) {
            this.extra().getOnInputFilled()(this);
        }
    };

    private addValue(value: any[], startingValue: any) {
        const newItemIndex = value.length;
        value.push(startingValue);
        this.value().set(value);
        this.extra().getOnItemAdded()(newItemIndex, this);
    }

    public removeInput = (index: number) => {
        const value = [...this.getDynamicValue()];
        const removedItem = value[index];
        value.splice(index, 1);
        this.value().set(value);
        this.extra().getOnItemRemoved()(removedItem, index, this);
    }

    extra(): IDynamicFieldExtra {
        return this._extra as IDynamicFieldExtra;
    }

    getType(): FieldType {
        return FieldType.DYNAMIC;
    }
}