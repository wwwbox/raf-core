import Field from "../Field/Concrete/Field";
import React from "react";

export default class DummyField extends Field {
    render(): any {
        return <input/>
    }
}