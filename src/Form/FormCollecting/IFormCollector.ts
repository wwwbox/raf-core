import {Service} from '@autofiy/autofiyable';
import {IForm} from "../IForm";
import {FieldType} from "../../Field/Concrete/FieldType";
import {IField} from "../../Field/IField";

export interface IFormCollector extends Service {
    files(): any;

    query(): any;

    data(): any;

    hasFiles(): boolean;
}

export class DefaultCollector implements IFormCollector {

    private readonly form: IForm;

    public constructor(form: IForm) {
        this.form = form;
    }

    hasFiles(): boolean {
        return this.form.fields().getAllRegistered().some(f => f.getType() === FieldType.FILE);
    }

    data(): any {
        return this.collect(field => field.getType() !== FieldType.FILE && !field.collecting().isAsQuery())
    }

    files(): any {
        return this.collect(field => field.getType() === FieldType.FILE)
    }

    query(): any {
        return this.collect(field => field.getType() !== FieldType.FILE && field.collecting().isAsQuery())
    }

    private collect(filter: (field: IField) => boolean): any {
        const data: any = {};
        this.form.fields().getAllRegistered().forEach(field => {
            if (field.collecting().shouldSkip() && filter(field)) {
                data[field.getName()] = field.collecting().collect()
            }
        });
        return data;
    }

}