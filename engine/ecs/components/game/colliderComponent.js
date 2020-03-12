/**
 * Collider component for scene's collider system.
 */
class Collider extends Component
{
    /**
     * Extract data from opts passed to constructor.
     */
    create()
    {
        super.create();                  
        this.collidedWith = this.getOpt("collidedWith", Array);         // Names of collided objects.
        this.collidedTags = this.getOpt("collidedTags", Array);         // Tags of collided objects.
        this.ignore = this.getOpt("ignore", Array);                     // Tags collider should ignore.
        this.static = this.getOpt("static", Boolean);                   // If collider will be moving.
        this.colliding = this.getOpt("colliding", Boolean);             // If collider is colliding.
        this.staticCollision = this.getOpt("staticCollision", Boolean); // If collider is colliding with non-static collider.
        this.trigger = this.getOpt("trigger", Boolean);                 // If collider is a trigger.
        
        // Create rectangle for collider.
        this.createRectangle();
    }

    /**
     * Extract rectangle from opts data or create one if not passed.
     */
    createRectangle()
    {
        // Get rectangle if already set.
        this.rect = this.getOpt("rect");

        // If not then create one with passsed data.
        if(this.rect === undefined)
        {
            // Get width and height from opts.
            this.width = this.getOpt("width");
            this.height = this.getOpt("height"); 
            
            // Create rectangle with parent and opt data.
            let rect = this.parent.createComponent(Rectangle, {x: this.parent.position.x, y: this.parent.position.y, width: this.width, height: this.height});

            // Store created rectangle.
            this.rect = rect;
        }
        else
        {  
            // If rectangle is passed, store its width and height.
            this.width = this.rect.width;
            this.height = this.rect.height; 
        }

    }
}