class NetworkedPIGM extends Pigm
{
    constructor(serverIP, canvas, bufferCanvas)
    {
        super(canvas, bufferCanvas);
        
        this.Socket = new WebSocket(serverIP);
        this.NetworkManager = new NetworkManager({socket: this.Socket});
        
        // Assign canvas and buffer canvas.
        this.canvas = canvas;
        this.bufferCanvas = bufferCanvas;

        // Create imagle loader and set base URL for assets.
        let il = new ImageLoader({baseUrl: window.location.href + "/assets/images/"});

        // Add engine to window's prototype.
        window["pigm"] = this;

        // Check to detect if map is loaded, once loaded create the level.
        let checkConnected = () => window.setTimeout(() => (this.Socket.readyState == this.Socket.OPEN) ? this.loaded(il) : checkConnected(), 32);
        checkConnected();
    }

    loaded(il)
    {
        // Create scene and start running it.
        this.scene = new TestScene({canvas: this.canvas, bufferCanvas: this.bufferCanvas, il: il});
        this.scene.cycleSystems();
    }
}