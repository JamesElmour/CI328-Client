class NetworkedBrickSystem extends System
{
    constructor(opts)
    {
        super(opts);

        this.HitSprite = this.getOpt("hitSprite");
        this.CriticalSprite = this.getOpt("criticalSprite");
        this.WonDeclared = false;
        this.Started = false;
    }

    precheck()
    {
        super.precheck();

        if(this.Started && this.components.length === 0 && !this.WonDeclared)
        {
            let parent = new Entity({position: new Vector2(500, 550)});
            let font = parent.createComponent(Font, {text: "You Win!"});

            window["pigm"].scene.FontRenderer.addComponent(font);
            this.WonDeclared = true;

            window["pigm"].scene.BallSystem.DestroyAllBalls = true;
        }
    }

    process(brick)
    {
        this.Started = true;

        //if(this.checkCollision(brick))
        //{
            //this.hit(brick);
        //}
    }

    checkCollision(brick)
    {
        let collider = brick.parent.getComponent(Collider);
        return collider.collidedTags.indexOf("Ball") !== -1;
    }

    hit(brick)
    {
        brick.health--;

        if(brick.health == 2)
        {
            brick.parent.getComponent(Sprite).image = this.HitSprite;
        }
        else if(brick.health == 1)
        {
            brick.parent.getComponent(Sprite).image = this.CriticalSprite;
        }

        if(brick.health <= 0)
        {
            brick.parent.destroy = true;
        }
    }
}