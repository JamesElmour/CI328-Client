/**
 * PowerUp component.
 */
class NetworkedPowerUp extends Component
{
    /**
     * Create PowerUp with given Callback opt.
     * @param {*} opts 
     */
    constructor(opts)
    {
        super(opts);

        this.getOpt("Callback");
    }
}