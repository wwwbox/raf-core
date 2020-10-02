import FieldChangeHandler from "../Protocol/FieldChangeHandler";
import {AutoUploadField} from "../Field/Concrete/AutoUploadField/AutoUploadField";

export class AutoUploadFieldChangeHandler implements FieldChangeHandler {

    private readonly _field: AutoUploadField;

    public constructor(field: AutoUploadField) {
        this._field = field;
    }

    getField(): AutoUploadField {
        return this._field;
    }

    handle(event: any): void {
        const value = this.getField().value().extractFromEvent(event);
        this.getField().extra().setSelectedFile(value, () => {
            this.getField().getUploader().upload();
        });
    }

}