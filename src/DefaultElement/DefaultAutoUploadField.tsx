import * as React from "react";
import { AutoUploadField } from "../Field/Concrete/AutoUploadField/AutoUploadField";
import { AutoUploadFieldExtraConfiguration } from "../Field/Concrete/AutoUploadField/AutoUploadFieldExtraConfiguration";

export interface DefaultAutoUploadFieldExtraConfiguration extends AutoUploadFieldExtraConfiguration {

}

export class DefaultAutoUploadField extends AutoUploadField {

    render(): any {
        if (this.extra().isUploading()) {
            return this.renderProgress();
        }
        if (this.extra().hasUploadedFile()) {
            return <h4>File Uploaded : {this.extra().getUploadedFile()}</h4>
        }
        return <input type={'file'}
            onChange={this.value().getOnChangeHandler().handle} />
    }

    private renderProgress(): any {
        return <div>
            <h4>Progress : {this.extra().getProgress()} %</h4>
            <button>Cancel</button>
        </div>
    }
}
