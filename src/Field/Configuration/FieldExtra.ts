import {FieldConfigurationServiceBase, IFieldConfigurationService} from "./FieldConfigurationService";
import {IField} from "../IField";

export interface IFieldExtraConfiguration<T> extends IFieldConfigurationService<T> {

}

export class FieldExtra<T = any> extends FieldConfigurationServiceBase<T> implements IFieldExtraConfiguration<T> {
    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }
}


