import {AutoUploader} from "./AutoUploader";
import {FieldProps} from "../../FieldProps";
import Field from "../../Field";
import {AutoUploadFieldExtra, IAutoUploadFieldExtra} from "./AutoUploadFieldExtra";
import {
    AutoUploadFieldExtraConfiguration,
    AutoUploadFieldExtraConfigurationInitializer
} from "./AutoUploadFieldExtraConfiguration";
import {AutoUploadFieldChangeHandler} from "../../../ChangeHandler/AutoUploadFieldChangeHandler";
import {IExtraConfigurationInitializer} from "../../Service/FieldStateInitializer";

//TODO : move into its own package
export class AutoUploadField<ExtraConfiguration extends AutoUploadFieldExtraConfiguration = AutoUploadFieldExtraConfiguration> extends Field<ExtraConfiguration> {

    private readonly uploader: AutoUploader;

    constructor(props: FieldProps) {
        super(props);
        this._extraService = new AutoUploadFieldExtra(this, "extra");
        this.state.value.defaultChangeHandler = () => new AutoUploadFieldChangeHandler(this);
        this.state.value.extractValueFromEvent = this.state.value.extractValueFromEvent ?? (e => e.target.files);
        this.uploader = this.extra().getUploader();
    }

    extra(): IAutoUploadFieldExtra<ExtraConfiguration> {
        return this._extraService as IAutoUploadFieldExtra;
    }

    public getUploader(): AutoUploader {
        return this.uploader;
    }

    protected getExtraConfigurationInitializer(): IExtraConfigurationInitializer<ExtraConfiguration> {
        return new AutoUploadFieldExtraConfigurationInitializer<ExtraConfiguration>();
    }
}