import {AutoUploader} from "./AutoUploader";
import {FieldProps} from "../../FieldProps";
import Field from "../Field";
import {AutoUploadFieldExtra, IAutoUploadFieldExtra} from "./AutoUploadFieldExtra";
import {AutoUploadFieldExtraConfiguration} from "./AutoUploadFieldExtraConfiguration";

export class AutoUploadField extends Field<AutoUploadFieldExtraConfiguration> {

    private readonly uploader: AutoUploader;

    constructor(props: FieldProps) {
        super(props);
        this._extra = new AutoUploadFieldExtra(this, "extra");
        this.uploader = null as any;
    }

    extra(): IAutoUploadFieldExtra {
        return this._extra as IAutoUploadFieldExtra;
    }


    //upload on select
    //render file after success upload
    //render progress
    //placeholder
    //uploader

}