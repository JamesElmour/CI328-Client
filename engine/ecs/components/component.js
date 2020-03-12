/**
 * Component base for all components.
 */
class Component extends Base
{
    /**
     * Component constructor.
     * @param {Object} parent (Entity).
     */
    constructor(opts)
    {
        super(opts);

        // Run create method, to be overidden and expanded upon in subclasses.
        this.create();
    }

    create()
    {
        this.parent = this.getOpt("parent");    // Get parent entity.
    }
}