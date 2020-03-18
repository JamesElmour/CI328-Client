class TestScene extends Scene
{
    constructor(opts)
    {
        super(opts);
    }

    createSystems()
    {
        super.createSystems();

        this.PlayerSystem = new NetworkedPlayerSystem({keyboard: this.keyboard, mouse: this.mouse});
        this.systems.push(this.PlayerSystem);

        this.createPlayer();
    }

    loadImages()
    {
        this.il.loadImage("entities/player/Debug.png");
    }

    createPlayer()
    {
        let entity = new Entity({name: "Player", position: new Vector2(300, 300)});
        let player = entity.createComponent(NetworkedPlayer, {});

        this.PlayerSystem.addComponent(player);
    }
}