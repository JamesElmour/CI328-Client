/**
 * Base render component for all render componets.
 */
class RenderComponent extends Component
{
    /**
     * RenderComponent constructor.
     * @param {Object} position (Vector2), visible (Boolean).
     */
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Extract data from opts post-constructor.
     */
    create()
    {
        this.position = this.getOpt("position", Vector2);       // Position to display at.
        this.visible = this.getOpt("visible", Boolean, true);   // If component is visible.

        super.create();
    }
}