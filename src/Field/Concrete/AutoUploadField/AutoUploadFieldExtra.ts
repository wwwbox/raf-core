import {FieldConfigurationBase, IFieldConfiguration} from "../../Configuration/FieldConfiguration";
import {AutoUploadFieldExtraConfiguration} from "./AutoUploadFieldExtraConfiguration";
import IField from "../../IField";
import {AutoUploader} from "./AutoUploader";

export interface IAutoUploadFieldExtra
    extends IFieldConfiguration<AutoUploadFieldExtraConfiguration> {

    getSelectedFile(): any;

    setSelectedFile(file: any): any;

    setUploadedFileFromResponse(response: any): void;

    getUploader(): AutoUploader;

    isUploading(): boolean;

    getUploadedFile(): string | null;

    hasUploadedFile(): boolean;

    getProgress(): number;
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

}