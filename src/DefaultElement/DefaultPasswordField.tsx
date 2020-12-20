import * as React from "react";
import { DefaultTextField as TextField } from "./DefaultTextField";


export class DefaultPasswordField extends TextField {

    protected getOtherProps(): any {
        return { type: 'password' };
    }

}


export default DefaultPasswordField;