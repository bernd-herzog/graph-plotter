import { PrimaryButton, TextField } from '@fluentui/react';
import { Text, ITextProps } from '@fluentui/react/lib/Text';

import React, { CSSProperties } from "react"
import { Card } from './Card';

const elementStyles:CSSProperties = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '500px',
    
}

export class Settings extends React.Component<
{
    onChange?: (newValue: string) => void;
},
{
    function: string,
    error?: string,
}> {  
    constructor(props:any) {
        super(props);

        this.state = { function: "Math.pow(x,5) / Math.pow(x,4)" }
    }

    render() {
        return (<>


            <div style={elementStyles}>
                <Card headerText={"Eigenschaften"} >
                <TextField 
                    label="f(x) = (Java-Script Syntax)" 
                    multiline 
                    rows={8} 
                    value={this.state.function} 
                    onChange={(ev, newValue) => this.setState({function:newValue ?? ""})}
                    errorMessage={this.state.error}
                     />

                <PrimaryButton text='Zeichnen'
                    onClick={()=>{
                        if (this.props.onChange) this.props.onChange(this.state.function);
                        this.setState({error: undefined});
                        }}
                    style={{marginTop: '40px'}}
                    />
                </Card>
            </div>
        </>);
    }

    public displayError (error:any): void{
        if (error instanceof SyntaxError) {
            var syntaxError = error as SyntaxError
            this.setState({error: syntaxError.message})
        }
    }
}