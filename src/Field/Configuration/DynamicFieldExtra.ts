import { FieldExtra, IFieldExtraConfiguration } from "./FieldExtra";
import { DynamicField } from "../Concrete/DynamicField";

export interface DynamicFieldConfiguration {
    maxInput: number;
    onMaxInputExceed: (field: DynamicField) => void;
    onInputFilled: (field: DynamicField) => void;
    onItemRemoved: (item: any, index: number, field: DynamicField) => void;
    onItemAdded: (index: number, field: DynamicField) => void;
}


export function getDefaultDynamicFieldConfiguration() {
    return {
        onItemRemoved: () => undefined,
        onItemAdded: () => undefined,
        onInputFilled: () => undefined,
        onMaxInputExceed: () => undefined,
        maxInput: 5
    }
}

export interface IDynamicFieldExtra<ExtraConfiguration extends DynamicFieldConfiguration = DynamicFieldConfiguration> extends IFieldExtraConfiguration<ExtraConfiguration> {
    getMaxInput(): number;

    setMaxInput(maxInput: number): void;

    getOnMaxInputExceed(): (field: DynamicField) => void;

    getOnInputFilled(): (field: DynamicField) => void;

    getOnItemRemoved(): (item: any, index: number, field: DynamicField) => void;

    getOnItemAdded(): (index: number, field: DynamicField) => void;
}

export class DynamicFieldExtra<ExtraConfiguration extends DynamicFieldConfiguration = DynamicFieldConfiguration> extends FieldExtra<ExtraConfiguration> implements IDynamicFieldExtra {
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

    protected unUpdatableKeys(): (keyof DynamicFieldConfiguration)[] {
        return ['onItemAdded', 'onItemRemoved', "onMaxInputExceed", "onInputFilled"];
    }

    getMaxInput(): number {
        return this.getConfiguration().maxInput;
    }

    setMaxInput(maxInput: number): void {
        return this.update('maxInput', maxInput);
    }
}

