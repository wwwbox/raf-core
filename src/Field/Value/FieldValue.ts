import {FieldValueConfiguration} from "./FieldValueConfiguration";
import {IField} from "../IField";
import {FieldChangeHandler} from "../../Protocol/FieldChangeHandler";
import {FieldConfigurationBase, IFieldConfiguration} from "../Configuration/FieldConfiguration";

export interface IFieldValue extends IFieldConfiguration<FieldValueConfiguration> {
    clear(): void;

    get(): any;

    set(value: any, validateAfterChange?: boolean, afterChange?: () => void): void;

    getOnChangeHandler(): FieldChangeHandler;

    extractFromEvent(e: any): any;
}

export class FieldValue extends FieldConfigurationBase<FieldValueConfiguration> implements IFieldValue {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    clear(): void {
        this.set(this.getConfiguration().clearValue);
    }

    extractFromEvent(e: any): any {
        return this.getConfiguration().extractValueFromEvent?.(e);
    }

    get(): any {
        return this.getConfiguration().value;
    }

    getOnChangeHandler(): FieldChangeHandler {
        const passedHandler = this.getField().getProps().valueChangeHandler;
        if (passedHandler) {
            return passedHandler(this.getField());
        }
        return this.getConfiguration().defaultChangeHandler(this.getField());
    }

    set(value: any, validateAfterChange?: boolean, afterChange?: () => void): void {
        this.update('value', value, () => {
            if (validateAfterChange === true) {
                this.getField().validation().validateWithEffect(true);
            }
            afterChange?.();
        });
    }

    protected unUpdatableKeys(): (keyof FieldValueConfiguration)[] {
        return ['valueChangeHandler', 'defaultChangeHandler'];
    }

}