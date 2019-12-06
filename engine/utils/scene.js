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
        this.canvasContext = this.canvas.getContext('2d');
        this.bufferCanvas = this.getOpt("bufferCanvas");
        this.context = this.bufferCanvas.getContext("2d");
        this.cycling = this.getOpt("cycling", Boolean, true);
        this.il = this.getOpt("il", Object);
        this.loadImages();
        this.keyboard = this.getOpt("keyboard", Object, new Keyboard({}));
        this.mouse = this.getOpt("mouse", Object, new Mouse({canvas: this.canvas}));
        this.camera = this.getOpt("camera", Camera, new Camera({mouse: this.mouse}));
        this.lastStep = this.getOpt("lastTime", Number);

        let opts = {
            tsUrl: window.location.href + "/assets/tilesets/Debug.json",
            mapUrl: window.location.href + "/assets/maps/TestMap.json",
            il: this.il
        };
        this.ml = this.getOpt("ml", Object, new MapLoader(opts));

        window.scene = this;

        this.createSystems();

        let finishCreate = () => 
        {
            this.il = this.ml.getOpt("il");
            this.createMap();
            this.createPlayer();
        }
        let checkLoad = () => window.setTimeout(() => this.ml.ready ? finishCreate() : checkLoad(), 10);
        checkLoad();

        window.scene = this;
        requestAnimationFrame(this.switchBuffer);

        super.create();
    }
    
    switchBuffer(step)
    {
        window.scene.canvasContext.drawImage(window.scene.bufferCanvas, 0, 0);
        
        let dt = -(step - window.scene.lastStep) / 1000.0;
        window.scene.lastStep = step;
        window.scene.cycleSystems(dt);
        requestAnimationFrame(window.scene.switchBuffer);
    }

    /**
     * Loads images for the scene.
     */
    loadImages()
    {
        this.il.loadImage("entities/player/debug.png");
        this.il.loadImage("projectiles/basic.png");
    }

    /**
     * Create the Scene's systems.
     */
    createSystems()
    {
        this.spriteRenderer = new SpriteRenderer({canvas: this.bufferCanvas, camera: this.camera});
        this.playerSystem = new PlayerSystem({keyboard: this.keyboard, mouse: this.mouse});
        this.colliderSystem = new ColliderSystem({});
        this.rigidMover = new RigidMover({});
        this.rigidChecker = new RigidChecker({mover: this.rigidMover});
        this.doorSystem = new DoorSystem({});
        this.gunSystem = new GunSystem({});
        this.bulletSystem = new BulletSystem({});
        
        this.systems.push(this.gunSystem);
        this.systems.push(this.bulletSystem);
        this.systems.push(this.playerSystem);
        this.systems.push(this.colliderSystem);
        this.systems.push(this.rigidChecker);
        this.systems.push(this.rigidMover);
        this.systems.push(this.doorSystem);
        this.systems.push(this.spriteRenderer);
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

            if(cs.layer === "Wall")
            {
                entity.tag = "Wall";
                let r = entity.createComponent(Rectangle, {width: 64, height: 64});
                let c = entity.createComponent(Collider, {rect: r, static: true});

                this.colliderSystem.addComponent(c);
            }

            if(cs.layer === "Doors")
            {
                entity.tag = "door";
                let r = entity.createComponent(Rectangle, {width: 64, height: 64});
                let i = ["bullet"]
                let c = entity.createComponent(Collider, {rect: r, static: false, ignore: i});
                let d = entity.createComponent(Door, {collider: c});

                this.colliderSystem.addComponent(c);
                this.doorSystem.addComponent(d);
            }
        }
    }

    /**
     *  Create the player for the scene.
     */
    createPlayer()
    {
        let e = new Entity({position: new Vector2(100, 100), tag: "player"});
        let g = e.createComponent(Gun, {bullet: new Bullet({ignore: ["player"]})})
        let p = e.createComponent(Player, {name: "player", tag: "player", Camera: this.camera, parent: e, gun: g});
        let s = e.createComponent(Sprite, {image: this.il.getImage("entities/player/debug.png")});
        let r = e.createComponent(Rectangle, {x: e.position.x, y: e.position.y, width: 32, height: 32});
        let c = e.createComponent(Collider, {rect: r, static: false});
        r = e.createComponent(RigidBody, {collider: c});

        this.playerSystem.addComponent(p);
        this.spriteRenderer.addComponent(s);
        this.colliderSystem.addComponent(c);
        this.rigidMover.addComponent(r);
        this.gunSystem.addComponent(g);

        e = new Entity({position: new Vector2(100, 200)});
        s = e.createComponent(Sprite, {image: this.il.getImage("entities/player/debug.png")});
        r = e.createComponent(Rectangle, {x: e.position.x, y: e.position.y, width: 50, height: 50});
        c = e.createComponent(Collider, {rect: r, static: false});
        let d = e.createComponent(Door, {collider: c});
        this.spriteRenderer.addComponent(s);
        this.colliderSystem.addComponent(c);
        this.doorSystem.addComponent(d);
    }

    /**
     * Cycle through each system.
     */
    cycleSystems(dt)
    {
        let t = this.lastTime - Date.now();
            
        this.clearScreen();

        for (const [key, system] of Object.entries(this.systems))
        {
            system.cycle(dt);
        }

        this.lastTime = Date.now();
        this.camera.update();
        
        this.lastTime = Date.now();

        this.mouse.reset();
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