import * as React from "react";
import { DefaultFieldBase } from "./DefaultFieldBase";


interface TextAreaExtraConfiguration {
    rows?: number;
}

export class DefaultTextAreaField extends DefaultFieldBase<TextAreaExtraConfiguration> {
    protected getInputComponent(): any {
        return 'textarea';
    }

    protected getOtherProps(): any {
        return {
            rows: 4
        }
    }
}


export default DefaultTextAreaField;