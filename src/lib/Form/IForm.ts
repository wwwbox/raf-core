import {RenderConfig} from "./FormProps";

export default interface IForm {


    getRenderConfig(): RenderConfig;

    startLoading(): void;

    stopLoading(): void;

    isLoading(): void;

    // collect():any;
    // validate():boolean;
    // submit():void;

    // emitEvent():void;

}