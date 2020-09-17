import {FieldConfigurationBase, IFieldConfiguration} from "../../Configuration/FieldConfiguration";
import {AutoUploadFieldFileExtraConfiguration} from "./AutoUploadFieldFileExtraConfiguration";
import IField from "../../IField";

export interface IAutoUploadFieldExtra<UploadOptions>
    extends IFieldConfiguration<AutoUploadFieldFileExtraConfiguration<UploadOptions>> {

}

export class AutoUploadFileFieldExtra<UploadOptions> extends FieldConfigurationBase<AutoUploadFieldFileExtraConfiguration<UploadOptions>> implements IAutoUploadFieldExtra<UploadOptions> {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }
}