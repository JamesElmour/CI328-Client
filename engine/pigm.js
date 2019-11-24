class Pigm
{
    constructor(canvas, bufferCanvas)
    {
        this.canvas = canvas;
        this.bufferCanvas = bufferCanvas;
        this.Log = new Logger();
        this.Log.write("PIGM.js Created.")
        let il = new ImageLoader({baseUrl: "http://uglyaks.com/apps/Game2/assets/images/"});

        this.loaded(il);
    }

    loaded(il)
    {       
        let scene = new Scene({canvas: this.canvas, bufferCanvas: this.bufferCanvas, il: il});
        
        let c = () => {scene.cycleSystems();}
        //let t = setInterval(c, (1000.0/60.0));
    }
}