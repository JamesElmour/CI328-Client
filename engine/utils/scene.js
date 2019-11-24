class Scene extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Create the Scene and load map.
     */
    create()
    {
        this.systems = this.getOpt("systems", Array);
        this.speed =  this.getOpt("speed", Number, (1000/60));
        this.canvas = this.getOpt("canvas");
        this.context = this.canvas.getContext("2d");
        this.cycling = this.getOpt("cycling", Boolean, true);
        this.il = this.getOpt("il", Object);
        this.loadImages();
        this.keyboard = this.getOpt("keyboard", Object, new Keyboard({}));
        this.mouse = this.getOpt("mouse", Object, new Mouse({canvas: this.canvas}));
        this.camera = this.getOpt("camera", Camera, new Camera({mouse: this.mouse}));

        let opts = {
            tsUrl: "http://localhost/Game/assets/tilesets/Debug.json",
            mapUrl: "http://localhost/Game/assets/maps/TestMap.json",
            il: this.il
        };
        this.ml = this.getOpt("ml", Object, new MapLoader(opts));

        this.createSystems();

        let finishCreate = () => 
        {
            this.il = this.ml.getOpt("il");
            this.createMap();
            this.createPlayer();
        }
        let checkLoad = () => window.setTimeout(() => this.ml.ready ? finishCreate() : checkLoad(), 10);
        checkLoad();


        super.create();
    }

    /**
     * Loads images for the scene.
     */
    loadImages()
    {
        this.il.loadImage("entities/player/debug.png");
    }

    /**
     * Create the Scene's systems.
     */
    createSystems()
    {
        this.spriteRenderer = new SpriteRenderer({canvas: this.canvas, camera: this.camera});
        this.playerSystem = new PlayerSystem({keyboard: this.keyboard});
        
        this.systems.push(this.spriteRenderer);
        this.systems.push(this.playerSystem);
    }

    /**
     * Once the map data is loaded, create the map.
     */
    createMap()
    {
        console.log("Creating map");
        for(let s = 0; s < this.ml.sprites.length; s++)
        {
            let cs = this.ml.sprites[s];
            let opts = 
            {
                position: cs.position
            };
            let entity = new Entity(opts);
            
            console.log(`Creating tile: [${s}]`);
            opts = 
            {
                parent: entity,
                image: this.il.getImage(cs.sprite)
            };
            let sprite = new Sprite(opts);
            this.spriteRenderer.addComponent(sprite);

            entity.addComponent(sprite);
        }
    }

    createPlayer()
    {
        let e = new Entity({position: new Vector2(100, 100)});
        let p = new Player({Camera: this.camera, parent: e});
        let s = e.createComponent(Sprite, {image: this.il.getImage("entities/player/debug.png")});

        e.addComponent(p);
        this.playerSystem.addComponent(p);
        this.spriteRenderer.addComponent(s);
    }

    /**
     * Cycle through each system.
     */
    cycleSystems()
    {
        this.clearScreen();

        for (const [key, system] of Object.entries(this.systems))
        {
            system.cycle();
        }

        this.camera.update();

        window.setTimeout(() => this.cycling ? this.cycleSystems() : false, this.speed);
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

        console.log(`Added [${sys.constructor.name}] to [${this.getOpt("name")}] with value [${sys.toString()}]`);
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