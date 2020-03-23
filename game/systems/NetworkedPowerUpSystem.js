class NetworkedPowerUpSystem extends System
{
    constructor(opts)
    {
        super(opts);

        this.Combos = [];
        this.Combos[0] =
        [
            () => window["pigm"].scene.BallSystem.components[0].speed += 200
        ];
    }

    process(powerup)
    {
        if(window["pigm"].scene.keyboard.key(32))
        {
            powerup.Callback();
            powerup.parent.destroy = true;
        }
    }

    GetPowerUp(comboCount)
    {
        if(this.components.length === 0)
        {
            let entity = new Entity({});
            let powerup = entity.createComponent(NetworkedPowerUp, {});
            powerup.Callback = this.Combos[0][0];

            this.components.push(powerup);
            
            let parent = new Entity({position: new Vector2(300, 600)});
            let font = parent.createComponent(Font, {text: "Speed Ball Powerup"});

            window["pigm"].scene.FontRenderer.addComponent(font);

            setTimeout(() => parent.destroy = true, 1000);
        }
    }
}