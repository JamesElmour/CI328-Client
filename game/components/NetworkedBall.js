/**
 * Ball component.
 */
class NetworkedBall extends Component
{
    /**
     * Create Ball with direction and speed opts.
     * @param {*} opts 
     */
    constructor(opts)
    {
        super(opts);
        this.direction = this.getOpt("direction", Vector2);
        this.speed     = this.getOpt("speed",     Number,  600);
    }
}