import {AutoUploader} from "./AutoUploader";
import {AutoUploadField} from "./AutoUploadField";

export interface AutoUploadFieldExtraConfiguration {
    inputFile: any;
    progress: number;
    uploading: boolean;
    placeholder: any;
    uploader: AutoUploader;
    uploadedFile: string | null;
    uploadedFileExtractorFromResponse: (response: any) => string;
    uploadOptions: any;
    renderPlaceholder: (field: AutoUploadField) => any;
    renderUploadedFile: (field: AutoUploadField) => any;
    renderProgress: (field: AutoUploadField) => any;
}

export function defaultAutoUploadFieldConfiguration<UploadOptions>(): AutoUploadFieldExtraConfiguration {
    return {
        inputFile: null,
        placeholder: null,
        renderPlaceholder: null as any,
        renderUploadedFile: null as any,
        renderProgress: null as any,
        progress: 0,
        uploading: false,
        uploadedFile: null,
        uploader: null as any,
        uploadOptions: null as any,
        uploadedFileExtractorFromResponse: (response) => response.toString()
    }
}
