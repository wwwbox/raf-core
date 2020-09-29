import {AutoUploader} from "./AutoUploader";
import {FieldProps} from "../../FieldProps";
import Field from "../Field";
import {AutoUploadFieldExtra, IAutoUploadFieldExtra} from "./AutoUploadFieldExtra";
import {
    AutoUploadFieldExtraConfiguration,
    AutoUploadFieldExtraConfigurationInitializer
} from "./AutoUploadFieldExtraConfiguration";
import {AutoUploadFieldChangeHandler} from "../../../ChangeHandler/AutoUploadFieldChangeHandler";
import {IExtraConfigurationInitializer} from "../FieldStateInitializer";

export class AutoUploadField<ExtraConfiguration extends AutoUploadFieldExtraConfiguration = AutoUploadFieldExtraConfiguration> extends Field<ExtraConfiguration> {

    private readonly uploader: AutoUploader;

    constructor(props: FieldProps) {
        super(props);
        this._extra = new AutoUploadFieldExtra(this, "extra");
        this.state.value.defaultChangeHandler = () => new AutoUploadFieldChangeHandler(this);
        this.state.value.extractValueFromEvent ??= e => e.target.files;
        this.uploader = this.extra().getUploader();
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<ExtraConfiguration> {
        return new AutoUploadFieldExtraConfigurationInitializer<ExtraConfiguration>();
    }

    extra(): IAutoUploadFieldExtra {
        return this._extra as IAutoUploadFieldExtra;
    }

    public getUploader(): AutoUploader {
        return this.uploader;
    }
}