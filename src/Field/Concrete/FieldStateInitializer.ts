import {FieldState} from "../FieldState";
import {FieldProps} from "../FieldProps";
import {FieldUIConfiguration} from "../Configuration/FieldUIConfiguration";
import {
    FieldCollectorConfiguration
} from "../Configuration/FieldCollectorConfiguration";
import {
    FieldValidationConfiguration
} from "../Configuration/FieldValidationConfiguration";
import {FieldValueConfiguration} from "../Configuration/FieldValueConfiguration";
import {DynamicFieldConfiguration} from "../Configuration/DyanmicFieldConfiguration";
import {getDefaultFieldUIConfiguration} from "../Configuration/Defaults/DefaultUIConfiguration";
import {getDefaultFieldValidationConfiguration} from "../Configuration/Defaults/DefaultValidationConfiguration";
import {getDefaultFieldCollectingConfiguration} from "../Configuration/Defaults/DefaultFieldCollectorConfiguration";
import {getDefaultFieldValueConfiguration} from "../Configuration/Defaults/DefaultValueConfiguration";
import {getDefaultDynamicFieldConfiguration} from "../Configuration/Defaults/DefaultDynamicFieldConfiguration";

export class FieldStateInitializer<T extends FieldState = FieldState, Extra = any> {
    private readonly props: FieldProps;
    private readonly extraInitializer: IExtraConfigurationInitializer<Extra>


    constructor(props: FieldProps, extraInitializer: IExtraConfigurationInitializer<Extra>) {
        this.props = props;
        this.extraInitializer = extraInitializer;
    }

    private static valueOrDefault(initial: any, defaultValue: any): any {
        if (initial === null || initial === undefined) {
            return defaultValue;
        }
        return initial;
    }

    public initialize(): FieldState {
        return {
            collecting: {
                ...this.getStateFromConfiguration<FieldCollectorConfiguration>(getDefaultFieldCollectingConfiguration())
            },
            ui: {
                ...this.getStateFromConfiguration<FieldUIConfiguration>(getDefaultFieldUIConfiguration())
            },
            validation: {
                ...this.getStateFromConfiguration<FieldValidationConfiguration>(getDefaultFieldValidationConfiguration())
            },
            value: {
                ...this.getStateFromConfiguration<FieldValueConfiguration>(getDefaultFieldValueConfiguration())
            },
            extra: {
                ...this.getExtra()
            }
        }
    }

    private getExtra(): any {
        return this.extraInitializer.initialize(this.props.extra);
    }

    private getStateFromConfiguration<T>(defaultConfiguration: T): T {
        const keys = Object.keys(defaultConfiguration);
        const result: T = {} as any;
        keys.forEach((key: any) => {
            (result as any)[key] = FieldStateInitializer.valueOrDefault((this.props as any)[key], (defaultConfiguration as any)[key]);
        })
        return result;
    }
}

export default FieldStateInitializer;

export interface IExtraConfigurationInitializer<T> {
    initialize(extraProps: any): T;
}

export class DefaultExtraConfigurationInitializer implements IExtraConfigurationInitializer<any> {
    initialize(extraProps: any): any {
        if (extraProps) {
            return {...extraProps};
        }
        return {};
    }
}

export class DynamicFieldExtraConfigurationInitializer implements IExtraConfigurationInitializer<DynamicFieldConfiguration> {
    initialize(extraProps: any): DynamicFieldConfiguration {
        return {
            ...getDefaultDynamicFieldConfiguration(),
            ...(extraProps ?? {})
        };
    }

}