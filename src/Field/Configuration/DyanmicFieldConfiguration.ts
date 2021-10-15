import {DynamicField} from "../Concrete/DynamicField";

export interface DynamicFieldConfiguration {
    maxInput: number;
    onMaxInputExceed: (field: DynamicField) => void;
    onInputFilled: (field: DynamicField) => void;
    onItemRemoved: (item: any, index: number, field: DynamicField) => void;
    onItemAdded: (index: number, field: DynamicField) => void;
}
