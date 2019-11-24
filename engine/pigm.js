class Pigm
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.Log = new Logger();
        this.Log.write("PIGM.js Created.")
        let il = new ImageLoader({baseUrl: "http://localhost/Game/assets/images/"});

        this.loaded(il);
    }

    loaded(il)
    {       
        let scene = new Scene({canvas: this.canvas, il: il});
        scene.cycleSystems();
    }
}