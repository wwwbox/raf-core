import {FieldConfigurationBase, IFieldConfiguration} from "../../Configuration/FieldConfiguration";
import {AutoUploadFieldExtraConfiguration} from "./AutoUploadFieldExtraConfiguration";
import IField from "../../IField";
import {AutoUploader} from "./AutoUploader";

export interface IAutoUploadFieldExtra<ExtraConfiguration extends AutoUploadFieldExtraConfiguration = AutoUploadFieldExtraConfiguration>
    extends IFieldConfiguration<ExtraConfiguration> {

    getSelectedFile(): any;

    setSelectedFile(file: any, afterChange: () => void): any;

    setUploadedFileFromResponse(response: any): void;

    removeUploadedFile(): void;

    getUploader(): AutoUploader;

    isUploading(): boolean;

    getUploadedFile(): string | null;

    hasUploadedFile(): boolean;

    getProgress(): number;
}

export class AutoUploadFieldExtra<ExtraConfiguration extends AutoUploadFieldExtraConfiguration = AutoUploadFieldExtraConfiguration>
    extends FieldConfigurationBase<ExtraConfiguration> implements IAutoUploadFieldExtra {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    getSelectedFile(): any {
        return this.config("inputFile");
    }

    setSelectedFile(file: any, afterChange: () => void): any {
        this.update("inputFile", file, afterChange);
    }

    setUploadedFileFromResponse(response: any): void {
        const uploadedFile = this.config("uploadedFileExtractorFromResponse")(response);
        this.update("uploadedFile", uploadedFile);
    }

    getUploader(): AutoUploader {
        return this.config('uploader')(this.getField());
    }

    getProgress(): number {
        return this.config('progress');
    }

    getUploadedFile(): string | null {
        return this.config('uploadedFile');
    }

    hasUploadedFile(): boolean {
        return !!this.getUploadedFile();
    }

    isUploading(): boolean {
        return this.config('uploading');
    }

    removeUploadedFile(): void {
        this.update('uploadedFile', null);
        this.getField().value().set(null);
    }

}