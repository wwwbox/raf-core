import FieldConfig from "../field/FieldConfig";

export default interface IForm {


    getFieldsConfig() : FieldConfig[];

    startLoading():void;
    stopLoading():void;
    isLoading() : void;

    // collect():any;
    // validate():boolean;
    // submit():void;

    // emitEvent():void;

}