import {FieldConfigurationServiceBase, IFieldConfigurationService} from "./FieldConfigurationService";
import {IField} from "../IField";

export interface FieldExtraConfigurationService<T> extends IFieldConfigurationService<T> {

}

export class DefaultFieldExtraConfigurationService<T = any> extends FieldConfigurationServiceBase<T> implements FieldExtraConfigurationService<T> {
    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }
}


