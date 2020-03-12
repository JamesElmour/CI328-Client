/**
 * Bullet system for processing all level bullets.
 */
class BulletSystem extends System
{
    /**
     * Process the given bullet.
     * @param {Bullet} bullet 
     */
    process(bullet)
    {
        // If the bullet hasn't hit something.
        if(!this.detectHit(bullet))
        {
            // Move the bullet.
            this.move(bullet);
        }
    }

    /**
     * Move the given bullet as per its parameters.
     * @param {Bullet} bullet 
     */
    move(bullet)
    {
        // Get bullet's position.
        let position = bullet.parent.position;

        // Move by its speed per second and its direction.
        position.x += bullet.direction.x * bullet.speed * this.dt;
        position.y += bullet.direction.y * bullet.speed * this.dt;

        bullet.parent.position = position;
    }

    /**
     * Detect if the bullet has hit something.
     * @param {Bullet} bullet 
     */
    detectHit(bullet)
    {
        // Get collider from parent.
        let collider = bullet.parent.getComponent(Collider);

        // If it's colliding, destroy this object and return tue.
        if(collider.colliding)
        {
            collider.parent.destroy = true;
            return true;
        }

        // Otherwise return false.
        return false;
    }
}