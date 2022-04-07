import { CSSProperties } from "react";
import { PrimaryButton, TextField } from '@fluentui/react';

const elementStyles:CSSProperties = {
    backgroundColor: '#AAAAAA',
    position: 'absolute',
    top: '32px',
    right: '32px',
    width: '400px',
    height: '80vh',
}
export function Settings() {
    return (<>
        <div style={elementStyles}>

        <TextField label="f(x) = " multiline rows={3} value={"x^5 + x^4 - 2x^3 - x^1 + 2x"}/>
        <PrimaryButton text='Draw' onClick={()=>{}} />

        </div>
    </>);
}