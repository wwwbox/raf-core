import IField from "../IField";
import {FieldCollectingConfiguration} from "./FieldCollectingConfiguration";
import {FieldConfigurationBase, IFieldConfiguration} from "../Configuration/FieldConfiguration";

export interface IFieldCollecting extends IFieldConfiguration<FieldCollectingConfiguration> {
    setSkip(skip: boolean): void;

    shouldSkip(): boolean;

    isReady(): boolean;

    setReady(ready: boolean): void;

    setAsQuery(asQuery: boolean): void;

    isAsQuery(): boolean;

    collect(): any;

}

export class FieldCollecting extends FieldConfigurationBase<FieldCollectingConfiguration> implements IFieldCollecting {


    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    protected unUpdatableKeys(): (keyof FieldCollectingConfiguration)[] {
        return ['collect'];
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

}

