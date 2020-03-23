class NetworkedBrickSystem extends System
{
    constructor(opts)
    {
        super(opts);

        this.HitSprite = this.getOpt("hitSprite");
        this.CriticalSprite = this.getOpt("criticalSprite");
    }

    process(brick)
    {
        if(this.checkCollision(brick))
        {
            this.hit(brick);
        }
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