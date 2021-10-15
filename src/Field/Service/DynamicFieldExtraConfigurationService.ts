import {DefaultFieldExtraConfigurationService, FieldExtraConfigurationService} from "./FieldExtraConfigurationService";
import {DynamicField} from "../Concrete/DynamicField";
import {DynamicFieldConfiguration} from "../Configuration/DyanmicFieldConfiguration";

export interface DynamicFieldExtraConfigurationService<ExtraConfiguration extends DynamicFieldConfiguration = DynamicFieldConfiguration> extends FieldExtraConfigurationService<ExtraConfiguration> {
    getMaxInput(): number;

    setMaxInput(maxInput: number): void;

    getOnMaxInputExceed(): (field: DynamicField) => void;

    getOnInputFilled(): (field: DynamicField) => void;

    getOnItemRemoved(): (item: any, index: number, field: DynamicField) => void;

    getOnItemAdded(): (index: number, field: DynamicField) => void;
}


export class DefaultDynamicFieldExtraConfigurationService<ExtraConfiguration extends DynamicFieldConfiguration = DynamicFieldConfiguration> extends DefaultFieldExtraConfigurationService<ExtraConfiguration> implements DynamicFieldExtraConfigurationService {
    getOnInputFilled(): (field: DynamicField) => void {
        return this.getConfiguration().onInputFilled;
    }

    getOnItemAdded(): (index: number, field: DynamicField) => void {
        return this.getConfiguration().onItemAdded;
    }

    getOnItemRemoved(): (item: any, index: number, field: DynamicField) => void {
        return this.getConfiguration().onItemRemoved;
    }

    getOnMaxInputExceed(): (field: DynamicField) => void {
        return this.getConfiguration().onMaxInputExceed;
    }

    getMaxInput(): number {
        return this.getConfiguration().maxInput;
    }

    setMaxInput(maxInput: number): void {
        return this.update('maxInput', maxInput);
    }

    protected unUpdatableKeys(): (keyof DynamicFieldConfiguration)[] {
        return ['onItemAdded', 'onItemRemoved', "onMaxInputExceed", "onInputFilled"];
    }
}

