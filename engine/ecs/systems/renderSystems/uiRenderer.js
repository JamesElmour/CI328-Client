/**
 * System for rendering UI elements to the screen.
 */
class UIRenderer extends System
{
    /**
     * Draw the UI sprite to the screen.
     * @param {Sprite} sprite 
     */
    process(sprite)
    {
        // Get sprite's position.
        let pos = sprite.parent.position;

        // Load sprite's image.
        let image = sprite.image;

        // Draw the sprite to the screen at absolute position, without camera's matrix.
        this.canvas.getContext("2d").drawImage(image, pos.x, pos.y);
    }
}