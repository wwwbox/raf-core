import {FieldConfigurationBase, IFieldConfiguration} from "./FieldConfiguration";
import IField from "../IField";

export interface IFieldExtraConfiguration<T> extends IFieldConfiguration<T> {

}

export class FieldExtra<T = any> extends FieldConfigurationBase<T> implements IFieldExtraConfiguration<T> {
    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }
}


