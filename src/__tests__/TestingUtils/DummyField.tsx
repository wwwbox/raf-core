import Field from "../../lib/Field/Field";
import React from "react";

export default class DummyField extends Field {
    render(): any {
        return <input/>
    }
}

export class DummyFileField extends Field {

    render(): any {
        return <input/>;
    }

    isFileField(): boolean {
        return true;
    }
}