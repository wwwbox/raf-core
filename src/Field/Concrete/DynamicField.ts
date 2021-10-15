import {Field} from "../Field";
import {DefaultDynamicFieldChangeHandler} from "../../ChangeHandler/DefaultDynamicFieldChangeHandler";
import {FieldProps} from "../FieldProps";
import {DynamicFieldConfiguration} from "../Configuration/DyanmicFieldConfiguration";
import {DynamicFieldExtraConfigurationInitializer, IExtraConfigurationInitializer} from "./FieldStateInitializer";
import {FieldType} from "./FieldType";
import {
    DefaultDynamicFieldExtraConfigurationService,
    DynamicFieldExtraConfigurationService
} from "../Service/DynamicFieldExtraConfigurationService";

export class DynamicField<ExtraConfiguration extends DynamicFieldConfiguration = DynamicFieldConfiguration> extends Field<ExtraConfiguration> {

    constructor(props: FieldProps) {
        super(props);
        const defaultValue = props.value;

        this.state.value.value = defaultValue ? (
            Array.isArray(defaultValue) ? [...defaultValue] : [defaultValue]
        ) : [''];
        this.state.value.defaultChangeHandler = () => new DefaultDynamicFieldChangeHandler(this);

        this._extraService = new DefaultDynamicFieldExtraConfigurationService(this, "extra");
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

    public removeInput = (index: number) => {
        const value = [...this.getDynamicValue()];
        const removedItem = value[index];
        value.splice(index, 1);
        this.valueService().set(value);
        this.extra().getOnItemRemoved()(removedItem, index, this);
    }

    extra(): DynamicFieldExtraConfigurationService<ExtraConfiguration> {
        return this._extraService as DynamicFieldExtraConfigurationService;
    }

    getType(): FieldType {
        return FieldType.DYNAMIC;
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<ExtraConfiguration> {
        return new DynamicFieldExtraConfigurationInitializer() as IExtraConfigurationInitializer<ExtraConfiguration>;
    }

    protected getDynamicValue(): any[] {
        return this.valueService().get();
    }

    private addValue(value: any[], startingValue: any) {
        const newItemIndex = value.length;
        value.push(startingValue);
        this.valueService().set(value);
        this.extra().getOnItemAdded()(newItemIndex, this);
    }
}

export default DynamicField;