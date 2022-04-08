import { Settings } from './Settings';
import React, { CSSProperties } from "react"
import { Graph } from './Graph';

export class App extends React.Component<
{
    
},
{
    function: string
}> {  

    private settingsRef: React.RefObject<Settings>;


    constructor(props:any) {
        super(props);
        this.settingsRef = React.createRef();
        this.state = { function: "" }
    }

    render() {
        return (<>
          <Graph 
            function={this.state.function}
            onError={error=>{this.settingsRef.current?.displayError(error)}}
           />
          <Settings
            ref={this.settingsRef}
            onChange={newvalue=> {this.setState({function: newvalue})}} 
          />
        </>);
    }
}