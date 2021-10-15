import {IField} from "../IField";

export interface IFieldConfigurationService<T> {
    update(key: keyof T, value: any, afterChange?: () => void): void;

    config<R = any>(key: keyof T): R;

    refreshConfiguration(): void;
}

export class FieldConfigurationServiceBase<T> implements IFieldConfigurationService<T> {

    private readonly field: IField;
    private readonly configurationKey: string;
    private currentConfiguration: T;

    protected constructor(field: IField, configurationKey: string) {
        this.field = field;
        this.configurationKey = configurationKey;
        this.currentConfiguration = this.getConfiguration();
    }

    public config<R = any>(key: keyof T): R {
        return this.getConfiguration()[key] as any;
    }

    public update(key: keyof T, value: any, afterChange?: () => void): void {
        if (this.unUpdatableKeys().includes(key)) {
            throw Error(`cannot update ${key}`);
        }
        const newConfiguration = {...this.currentConfiguration, [key]: value};
        this.currentConfiguration = {...newConfiguration};
        this.field.updateConfiguration<T>(this.getConfigurationKey(), newConfiguration, afterChange);
    }

    public refreshConfiguration(): void {
        this.currentConfiguration = this.getField().getConfiguration(this.getConfigurationKey());
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

}
