/**
 * Game over scene.
 */
class GameOverScene extends Scene
{
    /**
     * Create the scene.
     */
    create()
    {
        super.create();

        // Get the points player got and if they died.
        this.points = this.getOpt("points");
        this.died = this.getOpt("died");
        
        // If they died display relevant text.
        if(this.died)
        {
            this.addText(new Vector2(380, 50), "You died!");
        }
        else
        {
            this.addText(new Vector2(380, 50), "Good job!");
        }

        // Display player's points.
        this.addText(new Vector2(200, 125), "You scored " + Math.round(this.points) + " points");
        this.addText(new Vector2(200, 175), "Refresh page to retry");
    }
    
    /**
     * Create text at given position with the provided text.
     * @param {Vector2} position 
     * @param {Text} text 
     */
    addText(position, text)
    {
        // Create entity at position and the font component.
        let parent = new Entity({position: position});
        let font = parent.createComponent(Font, {text: text})

        // Add font to the font renderer.
        this.fontRenderer.addComponent(font);

        // Return created font.
        return font;
    }

    /**
     * Add the font renderer system.
     */
    createSystems()
    {
        this.fontRenderer = new FontRenderer({canvas: this.bufferCanvas});
        this.systems.push(this.fontRenderer);
    }
}