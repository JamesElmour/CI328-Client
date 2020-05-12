/**
 * Brick system to process Bricks.
 */
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
    }

    /**
     * Process the given Brick.
     * @param {*} brick 
     */
    process(brick)
    {
        this.Started = true;

        // If Brick has been collided with.
        if(this.checkCollision(brick))
        {
            // Process collision.
            this.hit(brick);
        }
    }

    /**
     * Check if Brick has collided with a Ball.
     * @param {*} brick 
     */
    checkCollision(brick)
    {
        let collider = brick.parent.getComponent(Collider);
        return collider.collidedTags.indexOf("Ball") !== -1;
    }

    /**
     * Process Brick hit by Ball.
     * @param {*} brick 
     */
    hit(brick)
    {
        // Deduct health.
        brick.health--;

        // Update sprite.
        if(brick.health == 2)
        {
            brick.parent.getComponent(Sprite).image = this.HitSprite;
        }
        else if(brick.health == 1)
        {
            brick.parent.getComponent(Sprite).image = this.CriticalSprite;
        }

        // If Brick health is zero, destroy it.
        if(brick.health <= 0)
        {
            brick.parent.destroy = true;
        }
    }
}