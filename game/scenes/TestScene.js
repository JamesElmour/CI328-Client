/**
 * Scene to handle Breakout game.
 */
class TestScene extends Scene
{
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Create Scene's systems and add them.
     */
    createSystems()
    {
        super.createSystems();

        this.ColliderSystem  = new ColliderSystem({});
        this.PlayerSystem    = new NetworkedPlayerSystem({keyboard: this.keyboard, mouse: this.mouse});
        this.BallSystem      = new NetworkedBallSystem({});
        this.BrickSystem     = new NetworkedBrickSystem({});
        this.PowerUpSystem   = new NetworkedPowerUpSystem({});
        this.AnimationSystem = new AnimatorSystem({});
        this.SpriteRenderer  = new SpriteRenderer({canvas: this.canvas, camera: this.camera});
        this.FontRenderer    = new FontRenderer({canvas: this.bufferCanvas});
        
        this.systems.push(this.ColliderSystem);
        this.systems.push(this.PlayerSystem);
        this.systems.push(this.BallSystem);
        this.systems.push(this.BrickSystem);
        this.systems.push(this.PowerUpSystem);
        this.systems.push(this.AnimationSystem);
        this.systems.push(this.SpriteRenderer);
        this.systems.push(this.FontRenderer);
    }

    /**
     * Load required images.
     */
    loadImages()
    {
        this.il.loadImage("entities/player/Debug.png");
        this.il.loadImage("entities/Brick.png");
        this.il.loadImage("entities/Brick-hit.png");
        this.il.loadImage("entities/Brick-critical.png");
        this.il.loadImage("entities/Ball.png");
        this.il.loadImage("brick/destory-1.png");
        this.il.loadImage("brick/destory-2.png");
        this.il.loadImage("brick/destory-3.png");
        this.il.loadImage("brick/destory-4.png");
        this.il.loadImage("brick/destory-5.png");

        let imagesLoaded = () => window.setTimeout(() => (this.il.loadingIndex == 0) ? this.loaded() : imagesLoaded(), 32);
        imagesLoaded();
    }

    /**
     * Once loded, create Bricks, Balls, and Players.
     */
    loaded()
    {
        this.createPlayer(false);
        this.createBricks(false);
        this.createBall(false, 0);
        this.createPlayer(true);
        this.createBricks(true);
        this.createBall(true, 0);

        this.BrickSystem.HitSprite = this.il.getImage("entities/Brick-hit.png");
        this.BrickSystem.CriticalSprite = this.il.getImage("entities/Brick-critical.png");
    }

    /**
     * Create a Player.
     * @param {*} opponent 
     */
    createPlayer(opponent)
    {
        /**
         * Create a Player, its Sprite, Collider and entity. Add them to the Scene.
         */
        let entity     = new Entity({name: "Player", position: new Vector2(300, 680)});
            entity.tag = "Player";
        let player     = entity.createComponent(NetworkedPlayer, {});
        let sprite     = entity.createComponent(Sprite, {image: this.il.getImage("entities/player/Debug.png")});
        let rectangle  = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 256, height: 4});
        let collider   = entity.createComponent(Collider, {rect: rectangle, static: false});

        this.PlayerSystem.addComponent(player);
        this.SpriteRenderer.addComponent(sprite);
        this.ColliderSystem.addComponent(collider);

        // If Player is opponent, shift position to the top of the screen.
        if(opponent)
        {
            entity.name = "Opponent_" + entity.name;
            entity.position.y = 340;
        }
    }

    /**
     * Create the required Bricks for the scene.
     * @param {*} opponent 
     */
    createBricks(opponent)
    {
        for(let x = 0; x < 18; x++)
        {
            for(let y = 0; y < 6; y++)
            {
                this.createBrick(x, y, opponent);
            }
        }
    }

    /**
     * Create a Ball for either the player or opponent at given ID.
     * @param {*} opponent 
     * @param {*} id 
     */
    createBall(opponent, id)
    {
        // Create Ball Entity, Sprite, and Collider then add them to the Scene.
        let entity     = new Entity({name: "Ball_" + id, position: new Vector2(300, 600)});
            entity.tag = "Ball";
        let ball       = entity.createComponent(NetworkedBall, {direction: new Vector2(0.33, -0.66)});
        let sprite     = entity.createComponent(Sprite, {image: this.il.getImage("entities/Ball.png")});
        let rectangle  = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 16, height: 16});
        let collider   = entity.createComponent(Collider, {rect: rectangle, static: false});

        this.BallSystem.addComponent(ball);
        this.SpriteRenderer.addComponent(sprite);
        this.ColliderSystem.addComponent(collider);

        // If Player is opponent, shift position to the top of the screen.
        if(opponent)
        {
            entity.name = "opponent_" + entity.name;
            entity.position.y = 300;
        }
    }

    /**
     * Create Brick at given position and health.
     * @param {*} x 
     * @param {*} y 
     * @param {*} opponent 
     * @param {*} h 
     */
    createBrick(x, y, opponent, h = 3)
    {
        // Create the Brick at designated position.
        let position = new Vector2((x * 64) + 60, (y * 16) + 420);
        let entity = new Entity({name: "Brick_" + x + "_" + y, position: position});
            entity.tag = "Brick";

        // Assign Sprite appropiate to the Brick's health.
        let s = this.il.getImage("entities/Brick.png");

        if(h === 2)
        {
            s = this.il.getImage("entities/Brick-hit.png");
        }
        else if (h === 1)
        {
            s = this.il.getImage("entities/Brick-critical.png");
        }

        // Add Brick's Sprite, Collider, and Component to the Scene.
        let sprite    = entity.createComponent(Sprite, {image: s});
        let rectangle = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 64, height: 16});
        let collider  = entity.createComponent(Collider, {rect: rectangle, static: false});
        let brick     = entity.createComponent(NetworkedBrick, {});

        this.SpriteRenderer.addComponent(sprite);
        this.ColliderSystem.addComponent(collider);
        this.BrickSystem.addComponent(brick);

        // If for opponent, shift up.
        if(opponent)
        {
            entity.name = "opponent_" + entity.name;
            entity.position.y -= 300;
        }
    }
}