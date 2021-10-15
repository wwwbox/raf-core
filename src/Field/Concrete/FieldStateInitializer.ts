import {FieldState} from "../FieldState";
import {FieldProps} from "../FieldProps";
import {FieldUIConfiguration, getDefaultFieldUIConfiguration} from "../Configuration/FieldUIConfiguration";
import {
    FieldCollectingConfiguration,
    getDefaultFieldCollectingConfiguration
} from "../Collecting/FieldCollectingConfiguration";
import {
    FieldValidationConfiguration,
    getDefaultFieldValidationConfiguration
} from "../Configuration/FieldValidationConfiguration";
import {FieldValueConfiguration, getDefaultFieldValueConfiguration} from "../Configuration/FieldValueConfiguration";
import {DynamicFieldConfiguration, getDefaultDynamicFieldConfiguration} from "../Configuration/DynamicFieldExtra";

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
                ...this.getStateFromConfiguration<FieldCollectingConfiguration>(getDefaultFieldCollectingConfiguration())
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