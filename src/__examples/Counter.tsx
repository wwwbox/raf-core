import React from "react";

export class Counter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {count: 1};
    }

    render(): any {
        const {count} = this.state;
        const setCount = () => this.setState({count: count + 1});
        return <div>
            <h1>{count}</h1>
            <button onClick={() => setCount()}>PLUS</button>
        </div>
    }
}