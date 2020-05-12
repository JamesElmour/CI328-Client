/**
 * Base scene class for all game levels.
 */
class Scene extends Base
{

    /**
     * Create the Scene and load map.
     */
    create()
    {
        this.systems = this.getOpt("systems", Array);                                   // Scene's systems.
        this.canvas = this.getOpt("canvas");                                            // The visible canvas.
        this.canvasContext = this.canvas.getContext('2d');                              // Visible canvas 2D context.
        this.bufferCanvas = this.getOpt("bufferCanvas");                                // Buffer canvas.
        this.context = this.bufferCanvas.getContext("2d");                              // Buffer canvas 2D context.
        this.il = this.getOpt("il", Object);                                            // Image loader.
        this.keyboard = this.getOpt("keyboard", Object, new Keyboard({}));              // Gather keyboard inputs.
        this.mouse = this.getOpt("mouse", Object, new Mouse({canvas: this.canvas}));    // Gather mouse properties.
        this.camera = this.getOpt("camera", Camera, new Camera({mouse: this.mouse}));   // Create scene's camera.
        this.lastStep = this.getOpt("lastTime", Number);                                // Time of last frame's called.
        this.stop = false;                                                              // Should stop scene's execution.
        this.dt = 1;                                                                    // Previous deltatime.
        this.previousTime = 0;
        this.currentTime = 0;
        // Add this scene to window's prototype.
        window.scene = this;

        // Create scene's systems.
        this.createSystems();

        // Load required images.
        this.loadImages();

        // Request a animation frame from browser.
        requestAnimationFrame(this.switchBuffer);

        super.create();
    }
    
    /**
     * Switches content from buffer canvas to visible canvas and prepare next frame.
     * @param {Number} step Time of previous frame's presentation.
     */
    switchBuffer(step)
    {
        // If the window shouldn't stop.
        if(!window.scene.stop)
        {
            // Copy from buffer to visible canvas.
            window.scene.canvasContext.drawImage(window.scene.bufferCanvas, 0, 0);
            
            // Calculate current deltatime.
            let dt = 0.00475;
            window.scene.dt = dt;
            window.scene.lastStep = step;
            window.scene.previousTime = window.scene.currentTime;
            window.scene.currentTime = step;

            //console.log((window.scene.currentTime - window.scene.previousTime) / 1000);
            // Prepare next frame.
            window.scene.cycleSystems(dt);
        }
    }

    /**
     * Loads images for the scene.
     */
    loadImages()
    {
    }

    /**
     * Create the Scene's systems.
     */
    createSystems()
    {
    }

    /**
     * Cycle through each system.
     */
    cycleSystems(dt)
    {
        // If scene shouldn't stop.
        if(!this.stop)
        {
            // Store current time for deltatime calculation on next frame.
            this.lastTime = Date.now();

            // Clear the buffer canvas.
            this.clearScreen();

            // Cycle through each system and run them.
            for (const [key, system] of Object.entries(this.systems))
            {
                system.cycle(dt);
            }

            // Update the camera's properties.
            this.camera.update();

            // Reset the mouse for next frame.
            this.mouse.reset();
            
            // Request animation frame from browser.
            requestAnimationFrame(this.switchBuffer);
        }
    }

    /**
     * Clear screen to black.
     */
    clearScreen()
    {
        this.context.fillRect(0, 0, 1280, 720);
    }

    /**
     * Attaches the given System to the Scene.
     * @param {System} sys 
     */
    addSystem(sys)
    {
        this.systems[typeof sys] = sys;

        //console.log(`Added [${sys.constructor.name}] to [${this.getOpt("name")}] with value [${sys.toString()}]`);
    }

    /**
     * Returns the System attached to Scene of given System Class.
     * @param {Class} sysClass 
     */
    getSystem(sysClass)
    {
        return this.systems[typeof sysClass];
    }
}