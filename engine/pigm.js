/**
 * Base engine class.
 */
class Pigm
{
    /**
     * Constructor for PIGM engine.
     * @param {Canvas} canvas 
     * @param {Canvas} bufferCanvas 
     */
    constructor(canvas, bufferCanvas)
    {
        // Assign canvas and buffer canvas.
        this.canvas = canvas;
        this.bufferCanvas = bufferCanvas;

        // Create imagle loader and set base URL for assets.
        let il = new ImageLoader({baseUrl: window.location.href + "/assets/images/"});

        // Add engine to window's prototype.
        window["pigm"] = this;

        // Create and load the first scene.
        this.loaded(il);
    }

    /**
     * Once loaded, create the first scene.
     * @param {ImageLoader} il 
     */
    loaded(il)
    {
        // Create scene and start running it.
        this.scene = new MainMenu({canvas: this.canvas, bufferCanvas: this.bufferCanvas, il: il});
        this.scene.cycleSystems();
    }

    /**
     * Change currently active scene.
     * @param {Scene} scene 
     */
    changeScene(scene)
    {
        // Stop the current scene.
        this.scene.stop = true;

        // Signal to delete by garbage collection.
        delete this.scene;

        // Assign scene and start running it.
        this.scene = scene;
        this.scene.cycleSystems();
    }
}