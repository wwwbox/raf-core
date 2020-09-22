import {AutoUploadField} from "./AutoUploadField";
import {AutoUploadFieldEvents} from "./AutoUploadFieldEvents";

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
        return this.field.extra().config("uploadOptions");
    }

    private onStart(): void {
        this.field.ui().setLoading(true);
        this.field.event().emitOnThis(AutoUploadFieldEvents.START, {});
        this.field.collecting().setReady(false);
        this.field.extra().update("uploading", true);
        this.field.extra().update("uploadedFile", null);
    }

    protected onCancel(): void {
        this.field.ui().setLoading(false);
        this.field.event().emitOnThis(AutoUploadFieldEvents.CANCEL, {});
    }

    protected onFail(response: any): void {
        this.field.event().emitOnThis(AutoUploadFieldEvents.FAIL, {response: response});
    }

    protected onSuccess(response: any): void {
        this.field.event().emitOnThis(AutoUploadFieldEvents.SUCCESS, {response: response});
        this.field.extra().setUploadedFile(response);
    }

    protected onComplete(response: any): void {
        this.field.event().emitOnThis(AutoUploadFieldEvents.COMPLETE, {response: response});
        this.field.ui().setLoading(false);
        this.field.collecting().setReady(true);
        this.field.extra().update("uploading", false);
    }

    protected onProgress(total: number, loaded: number, percent: number): void {
        this.field.extra().update('progress', percent);
        this.field.event().emitOnThis(AutoUploadFieldEvents.PROGRESS, {
            total: total,
            uploaded: loaded,
            percent: percent
        });
    }

    upload(): any {
        const options: any = this.options();
        const _self = this;
        this.request.onreadystatechange = function () {
            if (this.status === 0 && this.readyState === XMLHttpRequest.UNSENT) {
                _self.onCancel();
            }
            if (this.readyState === 4) {
                if (this.status < 400) {
                    _self.onSuccess(this.response);
                } else {
                    _self.onFail(this.response);
                }
                _self.onComplete(this.response);
            }
        }
        this.request.onprogress = function (e) {
            _self.onProgress(e.total, e.loaded, (e.loaded / e.total) * 100)
        }
        this.request.open(options.method, options.url, true);
        this.request.setRequestHeader('Content-Type', "multipart/form-data");
        this.request.send(this.field.extra().getSelectedFile());
        this.onStart();
    }


}