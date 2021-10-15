import {AutoUploader, DefaultAutoUploader} from "./AutoUploader";
import {AutoUploadField} from "./AutoUploadField";
import {IExtraConfigurationInitializer} from "../../Service/FieldStateInitializer";

export interface AutoUploadFieldExtraConfiguration {
    inputFile: any;
    progress: number;
    uploading: boolean;
    uploadedFile: string | null;
    uploader: (field: AutoUploadField) => AutoUploader;
    uploadOptions: any;
    uploadedFileExtractorFromResponse: (response: any) => string;
}

export function defaultAutoUploadFieldConfiguration<UploadOptions>(): AutoUploadFieldExtraConfiguration {
    return {
        inputFile: null,
        progress: 0,
        uploading: false,
        uploadedFile: null,
        uploader: (field: AutoUploadField) => new DefaultAutoUploader(field),
        uploadOptions: {},
        uploadedFileExtractorFromResponse: (response) => response.toString()
    }
}

export function defaultAutoUploadOptions(): any {
    return {
        method: 'POST',
        formKey: 'file'
    }
}

export class AutoUploadFieldExtraConfigurationInitializer<ExtraConfiguration extends AutoUploadFieldExtraConfiguration> implements IExtraConfigurationInitializer<ExtraConfiguration> {
    initialize(extraProps: any): ExtraConfiguration {
        return {...defaultAutoUploadFieldConfiguration(), ...(extraProps ?? {})};
    }
}