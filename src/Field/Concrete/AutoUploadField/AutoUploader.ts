import {AutoUploadField} from "./AutoUploadField";
import {AutoUploadFieldEvents} from "./AutoUploadFieldEvents";
import {defaultAutoUploadOptions} from "./AutoUploadFieldExtraConfiguration";

export interface AutoUploader {
    options(): any;

    upload(): void;

    cancel(): void;
}


export class DefaultAutoUploader implements AutoUploader {

    private readonly request: XMLHttpRequest;
    private readonly field: AutoUploadField;

    constructor(field: AutoUploadField) {
        this.field = field;
        this.request = new XMLHttpRequest();
    }

    cancel(): void {
        this.request.abort();
    }

    options(): any {
        const options = this.field.extra().config("uploadOptions") ?? {};
        return {...defaultAutoUploadOptions(), ...options}
    }

    upload(): any {
        this.setupEvents();
        this.send();
        this.onStart();
    }

    public onProgress(total: number, loaded: number, percent: number): void {
        this.field.extra().update('progress', percent);
        this.field.event().emitOnThis(AutoUploadFieldEvents.PROGRESS, {
            total: total,
            uploaded: loaded,
            percent: percent
        });
    }

    public onResponse(request: XMLHttpRequest) {
        if (request.status === 0 && request.readyState === XMLHttpRequest.UNSENT) {
            this.onCancel();
        }
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status < 400) {
                this.onSuccess(request.response);
            } else {
                this.onFail(request.response);
            }
            this.onComplete(request.response);
        }
    }

    protected onCancel(): void {
        this.field.uiService().setLoading(false);
        this.field.collecting().setReady(true);
        this.updateUploadState(false, null, 0);
        this.field.event().emitOnThis(AutoUploadFieldEvents.CANCEL, {});
    }

    protected onFail(response: any): void {
        this.field.event().emitOnThis(AutoUploadFieldEvents.FAIL, {response: response});
    }

    protected onSuccess(response: any): void {
        this.field.event().emitOnThis(AutoUploadFieldEvents.SUCCESS, {response: response});
        this.field.extra().setUploadedFileFromResponse(response);
    }

    protected onComplete(response: any): void {
        this.field.event().emitOnThis(AutoUploadFieldEvents.COMPLETE, {response: response});
        this.field.uiService().setLoading(false);
        this.field.collecting().setReady(true);
        this.updateUploadState(false, undefined, 0);
    }

    private updateUploadState(uploading?: boolean, uploadedFile?: any, progress?: number): void {
        uploading !== undefined && this.field.extra().update("uploading", uploading);
        uploadedFile !== undefined && this.field.extra().update("uploadedFile", uploadedFile);
        progress !== undefined && this.field.extra().update('progress', progress);
    }

    private onStart(): void {
        this.field.uiService().setLoading(true);
        this.field.collecting().setReady(false);
        this.updateUploadState(true, null, 0);
        this.field.event().emitOnThis(AutoUploadFieldEvents.START, {});
    }

    private setupEvents(): void {
        const _self = this;
        this.request.onreadystatechange = function () {
            _self.onResponse(this);
        }
        this.request.upload.addEventListener('progress', function (e) {
            _self.onProgress(e.total, e.loaded, (e.loaded / e.total) * 100)
        }, false);
    }

    private send(): void {
        const options: any = this.options();
        this.request.open(options.method, options.url, true);
        this.request.setRequestHeader('Content-Type', "multipart/form-data");
        const data = new FormData();
        data.append(options.formKey, this.field.extra().getSelectedFile())
        this.request.send(data);
    }
}