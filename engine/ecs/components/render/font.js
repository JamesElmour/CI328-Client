/**
 * Text font component for font system.
 */
class Font extends RenderComponent
{
    /**
     * Font constructor.
     * @param {Object} text (String), worldspace (Boolean).
     */
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Extract opt data from opts post-constructor.
     */
    create()
    {
        this.text = this.getOpt("text", String);                // Text to display.
        this.worldspace = this.getOpt("worldspace", Boolean);   // If text should be in worldspace or screenspace.
        
        super.create();
    }
}