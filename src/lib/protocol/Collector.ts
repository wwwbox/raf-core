import IForm from "../form/IForm";

export default interface Collector { 
    collect() : any;
    getForm() : IForm;
}