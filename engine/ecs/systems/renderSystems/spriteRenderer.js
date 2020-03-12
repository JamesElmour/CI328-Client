/**
 * System to render sprites to the screen.
 */
class SpriteRenderer extends System
{
    // Get data from opts.
    create()
    {
        // Get the scene's canvas and camera.
        this.canvas = this.getOpt("canvas");
        this.camera = this.getOpt("camera");

        super.create();
    }

    // Before all processing and pre-processing is ran.
    precheck()
    {
        super.precheck();

        // Get the camera's matrix.
        this.campos = window.scene.camera.getMatrix();
    }

    /**
     * Process and draw the given sprite.
     * @param {Sprite} sprite 
     */
    process(sprite)
    {
        // If the sprite should be drawn.
        if(this.shouldDraw(sprite))
        {
            // Draw the sprite.
            this.draw(sprite);
        }
    }

    /**
     * Return if the sprite should be drawn to the screen.
     * @param {Sprite} sprite 
     */
    shouldDraw(sprite)
    {
        // True if sprite is visible and on screen.
        return sprite.visible && this.onscreen(sprite.parent.position);
    }

    /**
     * Draw the given sprite.
     * @param {Sprite} sprite 
     */
    draw(sprite)
    {
        // Get the sprite's position.
        let pos = sprite.parent.position;

        // Get the sprite's image.
        let image = sprite.image;

        // Calculate the drawn position.
        let drawPos = new Vector2(pos.x + this.campos.x, pos.y + this.campos.y);

        // Draw the sprite to the screen.
        this.canvas.getContext("2d").drawImage(image, drawPos.x, drawPos.y);
    }

    /**
     * Return if the position is on screen.
     * @param {Vector2} position 
     */
    onscreen(position)
    {
        // Using camera's position, check if a position is on screen - with some padding.
        if(position.x > (-this.campos.x - 100) && position.x < (-this.campos.x + 1280) &&
           position.y > (-this.campos.y - 100) && position.y < (-this.campos.y + 720))
        {
            return true;
        }

        return false;
    }
}