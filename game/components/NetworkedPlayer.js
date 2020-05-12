/**
 * Player component.
 */
class NetworkedPlayer extends Component
{
    /**
     * Create Player with given direction and lives opts.
     * @param {*} opts 
     */
    constructor(opts)
    {
        super(opts);
        this.lives = 5;
        this.direction  = new Vector2(0, 0);
    }
}