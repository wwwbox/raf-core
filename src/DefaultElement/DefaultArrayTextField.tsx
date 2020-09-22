import DynamicField from "../Field/Concrete/DynamicField";
import React from "react";
import {DynamicFieldConfiguration} from "../Field/Configuration/DynamicFieldExtra";

interface ExtraConfiguration extends DynamicFieldConfiguration {
    label: string;
}

export default class DefaultArrayTextField extends DynamicField<ExtraConfiguration> {

    render(): any {
        const value = this.value().get();
        const label = this.extra().config('label' as any);
        return <div>
            {
                label && <h4 style={{margin: 0}}>{label}</h4>
            }
            <button onClick={() => this.addInput()}>ADD INPUT</button>

            {
                value.map((v: any, index: number) => <div key={index}>
                    <input value={v} type={'text'} onChange={e => this.value().getOnChangeHandler().handle(e)}/>
                    <button onClick={() => this.removeInput(index)}>REMOVE</button>
                </div>)
            }
        </div>
    }

}