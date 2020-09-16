import IForm from "../Form/IForm";

export default interface Collector { 
    collect() : any;
    getForm() : IForm;
}