import IForm from "../IForm";

export interface IFormUI {
    startLoading(): void;

    stopLoading(): void;

    isLoading(): boolean;

    render(): any;
}


export class FormUI implements IFormUI {

    private readonly form: IForm;

    constructor(form: IForm) {
        this.form = form;
    }

    isLoading(): boolean {
        return this.form.getInternalState().isLoading;
    }

    startLoading(): void {
        this.form.updateInternalState({isLoading: true});
    }

    stopLoading(): void {
        this.form.updateInternalState({isLoading: true});
    }

    render(): any {
        return null;
    }

}