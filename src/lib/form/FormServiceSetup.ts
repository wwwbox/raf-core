import {  FormServices } from "./FormProps";
import FormRenderer from "../protocol/FormRenderer";

export default class FormServiceSetup{

    private services : FormServices | undefined;


    public getFromRenderer():FormRenderer {
        if(this.services === undefined){
            //todo : get default renderer
            // default renderer can be found in FormDefaultServices or auto selected from code
        }
        //get passed renderer;
    }

}