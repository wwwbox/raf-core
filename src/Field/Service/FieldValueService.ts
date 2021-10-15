import {FieldValueConfiguration} from "../Configuration/FieldValueConfiguration";
import {IField} from "../IField";
import {FieldChangeHandler} from "../../Protocol/FieldChangeHandler";
import {FieldConfigurationServiceBase, IFieldConfigurationService} from "../Configuration/FieldConfigurationService";

export interface FieldValueService extends IFieldConfigurationService<FieldValueConfiguration> {
    clear(): void;

    get(): any;

    set(value: any, validateAfterChange?: boolean, afterChange?: () => void): void;

    getOnChangeHandler(): FieldChangeHandler;

    extractFromEvent(e: any): any;
}

export class DefaultFieldValueService extends FieldConfigurationServiceBase<FieldValueConfiguration> implements FieldValueService {

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
                this.getField().validator().validateWithEffect(true);
            }
            afterChange?.();
        });
    }

    protected unUpdatableKeys(): (keyof FieldValueConfiguration)[] {
        return ['valueChangeHandler', 'defaultChangeHandler'];
    }

}