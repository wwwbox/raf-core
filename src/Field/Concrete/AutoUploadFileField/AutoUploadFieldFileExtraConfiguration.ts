import {AutoUploader} from "./AutoUploader";
import {AutoUploadFileField} from "./AutoUploadFileField";

export interface AutoUploadFieldFileExtraConfiguration<UploadOptions> {
    progress: number;
    uploading: boolean;
    placeholder: any;
    uploader: AutoUploader<UploadOptions>;
    uploadedFile: string | null;
    uploadOptions: UploadOptions;
    renderPlaceholder: (field: AutoUploadFileField) => any;
    renderUploadedFile: (field: AutoUploadFileField) => any;
    renderProgress: (field : AutoUploadFileField) => any;
}

export function defaultAutoUploadFieldFileConfiguration<UploadOptions>(): AutoUploadFieldFileExtraConfiguration<UploadOptions> {
    return {
        placeholder: null,
        renderPlaceholder: null as any,
        renderUploadedFile: null as any,
        renderProgress : null as any,
        progress: 0,
        uploading: false,
        uploadedFile: null,
        uploader: null as any,
        uploadOptions: null as any
    }
}
