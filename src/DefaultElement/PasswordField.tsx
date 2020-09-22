import React from "react";
import TextField from "./TextField";


export default class PasswordField extends TextField {

    protected getOtherProps(): any {
        return {type: 'password'};
    }

}