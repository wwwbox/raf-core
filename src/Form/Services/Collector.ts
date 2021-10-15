import {Service} from '@autofiy/autofiyable';
import {IForm} from "../IForm";
import {FieldType} from "../../Field/FieldType";
import {IField} from "../../Field/IField";

export interface Collector extends Service {
    files(): any;

    query(): any;

    data(): any;

    hasFiles(): boolean;
}

export class DefaultCollector implements Collector {

    private readonly form: IForm;

    public constructor(form: IForm) {
        this.form = form;
    }

    hasFiles(): boolean {
        return this.form.fieldsManager().getAllRegistered().some(f => f.getType() === FieldType.FILE);
    }

    data(): any {
        return this.collect(field => field.getType() !== FieldType.FILE && !field.collector().isAsQuery())
    }

    files(): any {
        return this.collect(field => field.getType() === FieldType.FILE)
    }

    query(): any {
        return this.collect(field => field.getType() !== FieldType.FILE && field.collector().isAsQuery())
    }

    private collect(filter: (field: IField) => boolean): any {
        const data: any = {};
        this.form.fieldsManager().getAllRegistered().forEach(field => {
            if (!field.collector().shouldSkip() && filter(field)) {
                data[field.getName()] = field.collector().collect()
            }
        });
        return data;
    }

}