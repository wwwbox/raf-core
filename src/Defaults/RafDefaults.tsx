import { defaultSubmitOptions } from "./Services/DefaultSubmitter";

export interface IRafDefaults {
    form: {
        renderOptions: any;
        submitOptions: any;
    },

}


export const RafDefaults: IRafDefaults = {
    form: {
        renderOptions: {
            buttonText: 'Submit'
        },
        submitOptions: { ...defaultSubmitOptions }
    }
}