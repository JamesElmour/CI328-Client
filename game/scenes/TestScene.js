class TestScene extends Scene
{
    constructor(opts)
    {
        super(opts);
    }

    createSystems()
    {
        super.createSystems();

        this.ColliderSystem = new ColliderSystem({});
        this.PlayerSystem   = new NetworkedPlayerSystem({keyboard: this.keyboard, mouse: this.mouse});
        this.BallSystem     = new NetworkedBallSystem({});
        this.BrickSystem    = new NetworkedBrickSystem({});
        this.PowerUpSystem  = new NetworkedPowerUpSystem({});
        this.SpriteRenderer = new SpriteRenderer({canvas: this.canvas, camera: this.camera});
        this.FontRenderer   = new FontRenderer({canvas: this.bufferCanvas});
        
        this.systems.push(this.ColliderSystem);
        this.systems.push(this.PlayerSystem);
        this.systems.push(this.BallSystem);
        this.systems.push(this.BrickSystem);
        this.systems.push(this.PowerUpSystem);
        this.systems.push(this.FontRenderer);
        this.systems.push(this.SpriteRenderer);
    }

    loadImages()
    {
        this.il.loadImage("entities/player/Debug.png");
        this.il.loadImage("entities/Brick.png");
        this.il.loadImage("entities/Brick-hit.png");
        this.il.loadImage("entities/Brick-critical.png");
        this.il.loadImage("entities/Ball.png");

        let imagesLoaded = () => window.setTimeout(() => (this.il.loadingIndex == 0) ? this.loaded() : imagesLoaded(), 32);
        imagesLoaded();
    }

    loaded()
    {
        this.createPlayer();
        this.createBricks();
        this.createBall();

        this.BrickSystem.HitSprite = this.il.getImage("entities/Brick-hit.png");
        this.BrickSystem.CriticalSprite = this.il.getImage("entities/Brick-critical.png");
    }

    createPlayer()
    {
        let entity     = new Entity({name: "Player", position: new Vector2(300, 680)});
            entity.tag = "Player";
        let player     = entity.createComponent(NetworkedPlayer, {});
        let sprite     = entity.createComponent(Sprite, {image: this.il.getImage("entities/player/Debug.png")});
        let rectangle  = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 256, height: 4});
        let collider   = entity.createComponent(Collider, {rect: rectangle, static: false});

        this.PlayerSystem.addComponent(player);
        this.SpriteRenderer.addComponent(sprite);
        this.ColliderSystem.addComponent(collider);
    }

    createBricks()
    {
        for(let x = 0; x < 18; x++)
        {
            for(let y = 0; y < 6; y++)
            {
                let position = new Vector2((x * 64) + 60, (y * 16) + 420);
                let entity = new Entity({name: "Brick_" + x + "_" + y, position: position});
                    entity.tag = "Brick";
                let sprite    = entity.createComponent(Sprite, {image: this.il.getImage("entities/Brick.png")});
                let rectangle = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 64, height: 16});
                let collider  = entity.createComponent(Collider, {rect: rectangle, static: false});
                let brick     = entity.createComponent(NetworkedBrick, {});

                this.SpriteRenderer.addComponent(sprite);
                this.ColliderSystem.addComponent(collider);
                this.BrickSystem.addComponent(brick);
            }
        }
    }

    createBall()
    {
        let entity     = new Entity({name: "Ball", position: new Vector2(300, 600)});
            entity.tag = "Ball";
        let ball       = entity.createComponent(NetworkedBall, {direction: new Vector2(0.33, -0.66)});
        let sprite     = entity.createComponent(Sprite, {image: this.il.getImage("entities/Ball.png")});
        let rectangle  = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 16, height: 16});
        let collider   = entity.createComponent(Collider, {rect: rectangle, static: false});

        this.BallSystem.addComponent(ball);
        this.SpriteRenderer.addComponent(sprite);
        this.ColliderSystem.addComponent(collider);
    }
}