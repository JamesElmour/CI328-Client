/**
 * Sprite component for sprite system.
 */
class Sprite extends RenderComponent
{
    /**
     * Sprite constructor.
     * @param {Object} image (Image) 
     */
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.image = this.getOpt("image");  // Image to display.
        this.width = this.image.width;      // Width of image.  
        this.height = this.image.height;    // Height of image.
        super.create();
    }
}