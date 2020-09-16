import IField from "../IField";

export interface IFieldConfiguration<T> {
    update(key: keyof T, value: any, afterChange?: () => void): void;

    config<R = any>(key: keyof T): R;
}

export abstract class FieldConfigurationBase<T> implements IFieldConfiguration<T> {

    private readonly field: IField;
    private readonly configurationKey: string;


    protected constructor(field: IField, configurationKey: string) {
        this.field = field;
        this.configurationKey = configurationKey;
    }

    protected unUpdatableKeys(): (keyof T)[] {
        return [];
    }

    protected getConfiguration(): T {
        return this.field.getConfiguration<T>(this.getConfigurationKey());
    }

    protected getConfigurationKey(): string {
        return this.configurationKey;
    }

    protected getField(): IField {
        return this.field;
    }

    public config<R = any>(key: keyof T): R {
        return this.getConfiguration()[key] as any;
    }

    public update(key: keyof T, value: any, afterChange?: () => void): void {
        if (this.unUpdatableKeys().includes(key)) {
            throw Error(`cannot update ${key}`);
        }

        const currentConfiguration = this.getConfiguration();
        const newConfiguration = {...currentConfiguration, [key]: value};
        this.field.updateConfiguration<T>(this.getConfigurationKey(), newConfiguration, afterChange);
    }

}
