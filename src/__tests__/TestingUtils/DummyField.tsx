import Field from "../../lib/Field/Field";
import React from "react";

export default class DummyField extends Field {
    render(): any {
        return <input/>
    }

    public getProps = () => {
        return this.props;
    }
}
