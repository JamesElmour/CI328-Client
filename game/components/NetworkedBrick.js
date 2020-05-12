/**
 * Brick component.
 */
class NetworkedBrick extends Component
{
    /**
     * Create Brick with given Health opt.
     * @param {*} opts 
     */
    constructor(opts)
    {
        super(opts);
        this.health = this.getOpt("health", Number, 3);
    }
}