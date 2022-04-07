import React, { CSSProperties } from "react"

export class Canvas extends React.Component<{style: CSSProperties },{}>{  

    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props:any) {
        super(props);
        this.canvasRef = React.createRef();

    }
  
    componentDidMount() {
        this.draw ();
        window.addEventListener('resize', this.draw.bind(this))
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
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FF0000';
        ctx.moveTo(0,0);
        for (var i = 0; i < ctx.canvas.clientWidth; i++)
        {
            var x = this.screenToGraph(i, ctx.canvas.clientWidth);
            var y = x * x;
            var j = this.graphToScreen(y, ctx.canvas.clientHeight )
            ctx.lineTo(i, ctx.canvas.clientHeight-(j));
        }
        ctx.stroke();
        ctx.closePath();
    }

    private screenToGraph(i: number, clientWidth: number):number{
        return -1 + (i / clientWidth) * 2;
    }
    private graphToScreen(y: number, clientHeight: number):number{
        return (y + 1)/2 * clientHeight
    }

    render() {
        return(
            <>
                <canvas
                ref={this.canvasRef}
                style={this.props.style}
                 />
            </>
        );
    }
}