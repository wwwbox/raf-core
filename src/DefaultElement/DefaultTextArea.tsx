import React from "react";
import DefaultFieldBase from "./DefaultFieldBase";


interface TextAreaExtraConfiguration {
    rows?: number;
}

export default class DefaultTextArea extends DefaultFieldBase {
    protected getInputComponent(): any {
        return 'textarea';
    }

    protected getOtherProps(): any {
        return {
            rows: 4
        }
    }
}