import React from "react";
import TextField from "./DefaultTextField";


export default class DefaultPasswordField extends TextField {

    protected getOtherProps(): any {
        return {type: 'password'};
    }

}