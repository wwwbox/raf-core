import { DefaultFieldBase } from "./DefaultFieldBase";
import React from "react";

interface OptionsFieldExtraConfiguration {
    options: any[];
}

export abstract class DefaultOptionsFieldBase<ExtraConfiguration extends OptionsFieldExtraConfiguration = OptionsFieldExtraConfiguration> extends DefaultFieldBase<ExtraConfiguration> {

    protected getOptions(): any[] {
        return this.extra().config('options') ?? [];
    }

    protected renderOptions(): any {
        const options = this.getOptions();
        return options.map((option: any, index) => {
            return <React.Fragment key={index}>
                {this.renderOption(option, index)}
            </React.Fragment>
        })
    }

    protected abstract renderOption(option: any, index: number): any;

    protected renderInputChildren(): any {
        return this.renderOptions();
    }

}