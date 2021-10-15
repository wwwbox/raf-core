import {IField} from "../IField";
import {FieldCollectorConfiguration} from "../Configuration/FieldCollectorConfiguration";
import {FieldConfigurationServiceBase, IFieldConfigurationService} from "./FieldConfigurationService";

export interface FieldCollector extends IFieldConfigurationService<FieldCollectorConfiguration> {
    setSkip(skip: boolean): void;

    shouldSkip(): boolean;

    isReady(): boolean;

    setReady(ready: boolean): void;

    setAsQuery(asQuery: boolean): void;

    isAsQuery(): boolean;

    collect(): any;

}

export class DefaultFieldCollector extends FieldConfigurationServiceBase<FieldCollectorConfiguration> implements FieldCollector {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    isAsQuery(): boolean {
        return this.getConfiguration().asQuery;
    }

    isReady(): boolean {
        return this.getConfiguration().ready;
    }

    setAsQuery(asQuery: boolean): void {
        return this.update('asQuery', asQuery);
    }

    setReady(ready: boolean): void {
        this.update('ready', ready);
    }

    setSkip(skip: boolean): void {
        this.update('skipCollecting', skip);
    }

    shouldSkip(): boolean {
        return this.getConfiguration().skipCollecting;
    }

    collect(): any {
        return this.getConfiguration().collect(this.getField());
    }

    protected unUpdatableKeys(): (keyof FieldCollectorConfiguration)[] {
        return ['collect'];
    }

}

