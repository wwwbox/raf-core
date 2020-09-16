import DynamicField from "../Field/Concrete/DynamicField";
import React from "react";

export default class DynamicTextField extends DynamicField {
    render(): any {
        const value = this.state.value;
        return <div>
            {
                this.props.label && <h4 style={{margin: 0}}>{this.props.label}</h4>
            }
            <button onClick={() => this.addInput()}>ADD INPUT</button>
            {
                value.map((v: any, index: number) => <div key={index}>
                    <input value={v} type={'text'} onChange={e => this.handleChange({...e, index: index})}/>
                    <button onClick={() => this.removeInput(index)}>REMOVE</button>
                </div>)
            }
        </div>
    }
}