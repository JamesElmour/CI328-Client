/**
 * Class to control scene's camera.
 */
class Camera extends Base
{
    /**
     * Load data from opts.
     */
    create()
    {
        this.position = this.getOpt("position", Vector2);           // Get camera's position.
        this.position = new Vector2(640, 360);
        this.following = this.getOpt("following", Entity);          // Which entity the camera should follow.
        this.mouse = this.getOpt("mouse");                          // Scene's mouse entity.
        this.shake = this.getOpt("shake", Number, 0);               // Current amount of screen shake.
        this.shakeOffset = this.getOpt("shakeOffset", Vector2);     // Vector of the shake's offset.
        super.create();
    }

    /**
     * Update the camera's properties.
     */
    update()
    {
        // Update camera position to following's position.
        //this.position = this.following.position;

        // Shake the camera.
        this.shakeCamera();
    }

    /**
     * Method to handle camera's shake.
     */
    shakeCamera()
    {
        // Decrease shake effect by 200 per second.
        this.shake += 200 * window.scene.dt;
        
        // Limit so camera doesn't start shaking violently forever.
        this.shake = Math.max(this.shake, 0);

        // Get random shake offset, proportional to camera's shake.
        this.shakeOffset.x = Math.random() * this.shake;
        this.shakeOffset.y = Math.random() * this.shake;

        // Ensure shake offset, shakes in all directions.
        this.shakeOffset.x -= this.shakeOffset.x / 2;
        this.shakeOffset.y -= this.shakeOffset.y / 2;
    }

    /**
     * Returns the camer's position matrix.
     */
    getMatrix()
    {
        // Store base camera positiom matrix.
        let matrix = new Vector2(0, 0);
        matrix.x = -this.position.x + 640;
        matrix.y = -this.position.y + 360;

        // Apply mouse looking.
        matrix.x -= (300 * (this.mouse.position.x - 640) / 640);
        matrix.y -= ((300 / 640) * 360) * ((this.mouse.position.y - 360) / 360);

        // Apply shake
        matrix.x += this.shakeOffset.x;
        matrix.y += this.shakeOffset.y;

        // Round matrix to avoid pixel shimmer/crawl.
        matrix.x = Math.round(matrix.x);
        matrix.y = Math.round(matrix.y);

        // Return matrix.
        return matrix;
    }

    /**
     * Gets the distance from other to camera's following entity's position.
     * @param {Vector2} other 
     */
    distanceToFollowing(other)
    {
        let p = this.following.position;

        return Math.sqrt(Math.pow(other.x - p.x, 2) + Math.pow(other.y - p.y, 2));
    }

    /**
     * Get direction from camera to other.
     * @param {Vector2} other 
     */
    directionToFollowing(other)
    {
        // Clone of camera's position.
        let position = this.position.clone();

        // Direction from camera to other.
        let direction = new Vector2(position.x - other.x, position.y - other.y);
        
        // Calculate direction's magnitude.
        let magnitude = Math.abs(direction.x) + Math.abs(direction.y);
        direction = new Vector2(direction.x * magnitude, direction.y * magnitude);

        // Return direction.
        return direction.normalize();
    }

    /**
     * Set the shake for the camera.
     * @param {Number} shake 
     */
    setShake(shake)
    {
        this.shake = shake;
    }
}