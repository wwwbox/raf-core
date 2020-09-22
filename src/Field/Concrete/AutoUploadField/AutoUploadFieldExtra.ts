import {FieldConfigurationBase, IFieldConfiguration} from "../../Configuration/FieldConfiguration";
import {AutoUploadFieldExtraConfiguration} from "./AutoUploadFieldExtraConfiguration";
import IField from "../../IField";

export interface IAutoUploadFieldExtra
    extends IFieldConfiguration<AutoUploadFieldExtraConfiguration> {

    getSelectedFile(): any;

    setSelectedFile(file: any): any;

    setUploadedFile(response: any): void;
}

export class AutoUploadFieldExtra extends FieldConfigurationBase<AutoUploadFieldExtraConfiguration> implements IAutoUploadFieldExtra {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    getSelectedFile(): any {
        return this.config("inputFile");
    }

    setSelectedFile(file: any): any {
        this.update("inputFile", file);
    }

    setUploadedFile(response: any): void {
        const uploadedFile = this.config("uploadedFileExtractorFromResponse")(response);
        this.update("uploadedFile", uploadedFile);
    }
}