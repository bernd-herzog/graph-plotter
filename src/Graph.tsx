import { CSSProperties } from "react";
import { Canvas } from "./Canvas";

const graphStyles:CSSProperties = {
    backgroundColor: '#EEEEEE',
    border: 'solid 1px #333333',
    position: 'absolute',
    width: 'calc(100vh - 8px - 8px)',
    height: 'calc(100vh - 8px - 8px)',
    top: '8px',
    left: '8px',
}

export function Graph() {
    return (
    <>
        <Canvas style={graphStyles} />
    </>
    );
}