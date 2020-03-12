/**
 * Scene to prepare and play gameplay level.
 */
class GameLevel extends Scene
{

    /**
     * Create the scene.
     */
    create()
    {
        super.create();

        // Prepare opts for maploader.
        let opts = {
            tsUrl: window.location.href + "/assets/tilesets/Debug.json",
            mapUrl: window.location.href + "/assets/maps/TestMap.json",
            il: this.il
        };
        
        // Create the maploader, start loading the map.
        this.ml = this.getOpt("ml", Object, new MapLoader(opts));

        // Prepare method to create map.
        let createMethod = () => 
        {
            this.il = this.ml.getOpt("il");
            this.createMap();
            this.createObjects();
            this.createPlayer();
        };

        // Load options for muting music and sound.
        this.muteMusic = this.getOpt("muteMusic");
        this.muteSound = this.getOpt("muteSound");

        // If the music is muted, don't player music.
        if(this.muteMusic)
        {
            // Play the looping background music.
            let music = new Audio(window.location.href + "assets/sounds/PowerAttackBGM.mp3");
            music.volume = 0.3;
            music.loop = true;
            music.play();
        }
        
        // Check to detect if map is loaded, once loaded create the level.
        let checkLoad = () => window.setTimeout(() => this.ml.ready ? createMethod() : checkLoad(), 10);
        checkLoad();
    }

    /**
     * Load the scene's required images.
     */
    loadImages()
    {
        this.il.loadImage("entities/player/debug.png");
        this.il.loadImage("entities/enemy/debug.png");
        this.il.loadImage("entities/enemy/staticBot.png");
        this.il.loadImage("entities/enemy/staticBotHit.png");
        this.il.loadImage("entities/enemy/slowBot.png");
        this.il.loadImage("entities/pickups/healthPickup.png");
        this.il.loadImage("projectiles/player.png");
        this.il.loadImage("projectiles/enemy.png");
        this.il.loadImage("particles/explosion/explosion_1.png");
        this.il.loadImage("particles/explosion/explosion_2.png");
        this.il.loadImage("particles/explosion/explosion_3.png");
        this.il.loadImage("particles/explosion/explosion_4.png");
        this.il.loadImage("particles/explosion/explosion_5.png");
        this.il.loadImage("particles/explosion/explosion_6.png");
        this.il.loadImage("particles/explosion/explosion_7.png");
        this.il.loadImage("scifi/door.png");
    }

    /**
     * Creates and adds the scene's systems.
     */
    createSystems()
    {
        this.playerSystem = new PlayerSystem({keyboard: this.keyboard, mouse: this.mouse});
        this.rigidMover = new RigidMover({});
        this.rigidChecker = new RigidChecker({mover: this.rigidMover});
        this.doorSystem = new DoorSystem({});
        this.gunSystem = new GunSystem({});
        this.bulletSystem = new BulletSystem({});
        this.enemySystem = new EnemySystem({});
        this.animatorSystem = new AnimatorSystem({});
        this.spriteRenderer = new SpriteRenderer({canvas: this.bufferCanvas, camera: this.camera});
        this.colliderSystem = new ColliderSystem({});
        this.ui = new UIRenderer({});
        this.fontRenderer = new FontRenderer({canvas: this.bufferCanvas});
        this.pickupSystem = new PickupSystem({});
        
        this.systems.push(this.gunSystem);
        this.systems.push(this.pickupSystem);
        this.systems.push(this.bulletSystem);
        this.systems.push(this.enemySystem);
        this.systems.push(this.doorSystem);
        this.systems.push(this.doorSystem);
        this.systems.push(this.spriteRenderer);
        this.systems.push(this.ui);
        this.systems.push(this.fontRenderer);
        this.systems.push(this.animatorSystem);
        this.systems.push(this.playerSystem);
        this.systems.push(this.colliderSystem);
        this.systems.push(this.rigidChecker);
        this.systems.push(this.rigidMover);
    }
    
    /**
     * Once the map data is loaded, create the map.
     */
    createMap()
    {
        // Log the map's creation.
        this.log("Creating map");

        // Cycle through the sprites that require creation.
        for(let s = 0; s < this.ml.sprites.length; s++)
        {
            // Get the current sprite.
            let currentSprite = this.ml.sprites[s];

            // Opts for sprite's entity.
            let opts = 
            {
                position: currentSprite.position
            };

            // Create entity.
            let entity = new Entity(opts);
            
            // Log the creation.
            this.log(`Creating tile: [${s}]`);

            // Set sprite opts.
            opts = 
            {
                parent: entity,
                image: this.il.getImage(currentSprite.sprite)
            };

            // Create and add sprite.
            let sprite = entity.createComponent(Sprite, opts);
            this.spriteRenderer.addComponent(sprite);

            // If the entity is a wall.
            if(currentSprite.layer === "Wall")
            {
                // Set the entity's tag.
                entity.tag = "Wall";

                // Create the rectangle and the wall's collider.
                let rect = entity.createComponent(Rectangle, {width: 64, height: 64});
                let collider = entity.createComponent(Collider, {rect: rect, static: true});

                // Add collider to collider system.
                this.colliderSystem.addComponent(collider);
            }

            // If entity is a door.
            if(currentSprite.layer === "Doors")
            {
                // Set the entity's tag.
                entity.tag = "door";

                // Create the required door component.
                let door = entity.createComponent(Door, {});

                // Add door to the door system.
                this.doorSystem.addComponent(door);
            }
        }
    }

    /**
     * Create the scene's objects.
     */
    createObjects()
    {
        // Log object creation started.
        this.log("Create objects");

        // Loop through all objects to be loaded.
        for(let s = 0; s < this.ml.objects.length; s++)
        {
            // Current object.
            let obj = this.ml.objects[s];

            // Create the required object.
            switch(obj.type)
            {
                case "Player":
                    this.addPlayer(obj.position);
                    break;
                case "Static":
                    this.addEnemy(obj.position, "static");
                    break;
                case "Slow":
                    this.addEnemy(obj.position, "slow");
                    break;
                case "Multi":
                    this.addEnemy(obj.position, "multi");
                    break;
                case "Health":
                    this.addPickup(obj.position, "health");
                    break;
            }
        }
    }
    /**
     * Add the player to the scene.
     * @param {Vector2} position Player's spawning position.
     */
    addPlayer(position)
    {
        // Create health UI.
        let entity = new Entity({position: new Vector2(10, 10)});
        let font = entity.createComponent(Font, {text: "100%"});
        
        // Create equipped trigger UI.
        entity = new Entity({position: new Vector2(980, 50)});
        let triggerText = entity.createComponent(Font, {text: "Standard"});

        // Create equipped barrel UI.
        entity = new Entity({position: new Vector2(980, 10)});
        let barrelText = entity.createComponent(Font, {text: "Standard"});

        // Create UI for player's points.
        entity = new Entity({position: new Vector2(10, 50)});
        let pointText = entity.createComponent(Font, {text: "Points: 0"});

        // Add the text UI to the font renderer.
        this.fontRenderer.addComponent(font);
        this.fontRenderer.addComponent(triggerText);
        this.fontRenderer.addComponent(barrelText);
        this.fontRenderer.addComponent(pointText);

        // Create player's entity and components.
        entity = new Entity({position: position, tag: "player"});
        let gun = entity.createComponent(Gun, {shootSound: "playerShoot", trigger: new StandardTrigger(), barrel: new StandardBarrel()});
        let player = entity.createComponent(Player, {name: "player", tag: "player", Camera: this.camera, parent: entity, gun: gun, healthUI: font, barrelUI: barrelText, triggerUI: triggerText, pointUI: pointText});
        let sprite = entity.createComponent(Sprite, {image: this.il.getImage("entities/player/debug.png")});
        let rectangle = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 32, height: 32});
        let collider = entity.createComponent(Collider, {rect: rectangle, static: false, ignore: ["playerbullet", "door"]});
        rectangle = entity.createComponent(RigidBody, {collider: collider});

        // Set the scene's player attribute to created player.
        this.player = player;

        // Add all components to scene's systems.
        this.playerSystem.addComponent(player);
        this.spriteRenderer.addComponent(sprite);
        this.colliderSystem.addComponent(collider);
        this.rigidMover.addComponent(rectangle);
        this.gunSystem.addComponent(gun);
    }

    /**
     * Creates and add an enemy at the given position and of the provided type.
     * @param {Vector2} position 
     * @param {String} type 
     */
    addEnemy(position, type)
    {
        // Create enemy's entity and collider.
        let entity = new Entity({position: position, tag: "enemy"});
        let rectangle = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 32, height: 42});
        let collider = entity.createComponent(Collider, {rect: rectangle, static: false});

        let gun, spriteUrl;

        // Create the gun for the required enemy.
        if(type === "static")
        {
            gun = entity.createComponent(Gun, {shootSound: "playerShoot", trigger: new StandardTrigger(), barrel: new StandardBarrel()});
            spriteUrl = "staticBot";
        }
        else if (type === "slow")
        {
            gun = entity.createComponent(Gun, {shootSound: "playerShoot", trigger: new SlowEnemyTrigger(), barrel: new SlowEnemyBarrel()});
            spriteUrl = "slowBot";
        }
        else if (type === "multi")
        {
            gun = entity.createComponent(Gun, {shootSound: "playerShoot", trigger: new SlowEnemyTrigger(), barrel: new PlayerSpreadBarrel()});
            spriteUrl = "slowBot";
        }

        // Create the enemy's sprite.
        let sprite = entity.createComponent(Sprite, {image: this.il.getImage("entities/enemy/" + spriteUrl + ".png")});

        // Create enemy AI.
        let ai = entity.createComponent(Enemy, {gun: gun, sprite: sprite, defaultSprite: sprite.image, hitSprite: this.il.getImage("entities/enemy/staticBotHit.png")});

        // Add enemy components to the scene's systems.
        this.spriteRenderer.addComponent(sprite);
        this.colliderSystem.addComponent(collider);
        this.enemySystem.addComponent(ai);
        this.gunSystem.addComponent(gun);
    }

    /**
     * Add a pickup to the scene.
     * @param {Vector2} position 
     * @param {String} type 
     */
    addPickup(position, type)
    {
        // Create the entity, sprite and pickup.
        let entity = new Entity({position: position, tag: "pickup"});
        let sprite = entity.createComponent(Sprite, {image: this.il.getImage("entities/pickups/healthPickup.png")});
        let pickup = entity.createComponent(HealthPickup, {});

        // Add pickup to scene's systems.
        this.pickupSystem.addComponent(pickup);
        this.spriteRenderer.addComponent(sprite);
    }
}