import React, { CSSProperties } from "react"

const graphStyles:CSSProperties = {
    backgroundColor: '#EEEEEE',
    border: 'solid 1px #333333',
    position: 'absolute',
    width: 'calc(100vh - 8px - 8px)',
    height: 'calc(100vh - 8px - 8px)',
    top: '8px',
    left: '8px',
}

export class Graph extends React.Component<
{ 
    function: string,
    onError?: (error: any) => void;
},
{ }>{  

    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props:any) {
        super(props);
        this.canvasRef = React.createRef();
    }
  
    componentDidMount() {
        this.draw ();
        window.addEventListener('resize', this.draw.bind(this))
    }

    componentDidUpdate?(prevProps: any, prevState: any, snapshot?: any): void {
        this.draw ();
    }


    private draw (){
        var canvas = this.canvasRef.current;
    
        if (canvas){
            canvas.height = canvas.clientHeight;
            canvas.width = canvas.clientWidth;

            var ctx = canvas.getContext("2d");
            if (ctx){
                ctx.font = "20px Courier";
                ctx.fillText("0", canvas.clientWidth / 2+5, canvas.clientHeight / 2-5);

                ctx.fillText("-1", canvas.clientWidth / 4+5, canvas.clientHeight / 2-5);
                ctx.fillText("1", canvas.clientWidth / 2+5, canvas.clientHeight / 4-5);
                ctx.fillText("1", canvas.clientWidth / 4*3+5, canvas.clientHeight / 2-5);
                ctx.fillText("-1", canvas.clientWidth / 2+5, canvas.clientHeight / 4*3-5);
               
                ctx.fillText("-∞", 0+5, canvas.clientHeight / 2-5);
                ctx.fillText("∞", canvas.clientWidth -15, canvas.clientHeight / 2-5);
                ctx.fillText("∞", canvas.clientWidth / 2+5, 0+15);
                ctx.fillText("-∞", canvas.clientWidth / 2+5, canvas.clientHeight -5);


                this.drawLine(ctx, 0, canvas.clientHeight/2, canvas.clientWidth, canvas.clientHeight/2);
                this.drawLine(ctx, 0, canvas.clientHeight/4, canvas.clientWidth, canvas.clientHeight/4);
                this.drawLine(ctx, 0, canvas.clientHeight/4*3, canvas.clientWidth, canvas.clientHeight/4*3);

                this.drawLine(ctx, canvas.clientWidth / 2, 0, canvas.clientWidth / 2, canvas.clientHeight);
                this.drawLine(ctx, canvas.clientWidth / 4, 0, canvas.clientWidth / 4, canvas.clientHeight);
                this.drawLine(ctx, canvas.clientWidth / 4*3, 0, canvas.clientWidth / 4*3, canvas.clientHeight);

                this.drawFunction(ctx);
            }
        }
    }

    private drawLine(ctx: CanvasRenderingContext2D, xFrom: number, yFrom: number, xTo: number, yTo: number){
        ctx.beginPath();

        ctx.moveTo(xFrom, yFrom);
        ctx.lineTo(xTo, yTo);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#BBBBBB';
        ctx.stroke();

        ctx.closePath();
    }
  
    private drawFunction(ctx: CanvasRenderingContext2D){

        try {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FF0000';
            var first:Boolean = true;
    
            for (var i = 0; i < ctx.canvas.clientWidth; i++)
            {
                var x = this.screenToGraph(i, ctx.canvas.clientWidth);
                var y = this.calculateFunction(x);

                if (Number.isNaN(y))
                    continue;

                var j = this.graphToScreen(y, ctx.canvas.clientHeight )
                if (first){
                    ctx.moveTo(i, ctx.canvas.clientHeight-(j));
                    first = false;
                }
                else{
                    ctx.lineTo(i, ctx.canvas.clientHeight-(j));
                }
            }
        } catch (error:any) {
            if (this.props.onError) this.props.onError(error);
        } finally {
            ctx.stroke();
            ctx.closePath();
        }


    }

    private screenToGraph(i: number, clientWidth: number): number{
        var x = -2 + (i / clientWidth) * 4

        if (x >= -1 && x <=1)
            return x;
        
        if (x < -1){
            return -1/(2 + x)
        }

        if (x > 1){
            return 1/(2 - x)
        }

        return 0;
    }

    private calculateFunction(x: number): number{

        var result = eval(this.props.function)

        if (typeof result === 'function') {
            return result(x);
        }

        return result;
    }

    private graphToScreen(y: number, clientHeight: number): number{
        
        if (y >= -1 && y <= 1){
            return (y + 2)/4 * clientHeight
        }
        if (y < -1){
            return clientHeight - (((1/y)+2 +2) / 4*clientHeight)
        }
        if (y > 1){
            return clientHeight - (((1/y)-2 +2) / 4*clientHeight)
        }
        return 0
    }

    render() {
        return(
            <>
                <canvas
                ref={this.canvasRef}
                style={graphStyles}
                 />
            </>
        );
    }
}