class TestScene extends Scene
{
    constructor(opts)
    {
        super(opts);
    }

    createSystems()
    {
        super.createSystems();

        this.PlayerSystem   = new NetworkedPlayerSystem({keyboard: this.keyboard, mouse: this.mouse});
        this.SpriteRenderer = new SpriteRenderer({canvas: this.canvas, camera: this.camera});
        this.systems.push(this.PlayerSystem);
        this.systems.push(this.SpriteRenderer);
    }

    loadImages()
    {
        this.il.loadImage("entities/player/Debug.png");

        let imagesLoaded = () => window.setTimeout(() => (this.il.loadingIndex == 0) ? this.loaded() : imagesLoaded(), 32);
        imagesLoaded();
    }

    loaded()
    {
        this.createPlayer();
    }

    createPlayer()
    {
        let entity = new Entity({name: "Player", position: new Vector2(300, 300)});
        let player = entity.createComponent(NetworkedPlayer, {});
        let sprite = entity.createComponent(Sprite, {image: this.il.getImage("entities/player/Debug.png")});

        this.PlayerSystem.addComponent(player);
        this.SpriteRenderer.addComponent(sprite);
    }
}