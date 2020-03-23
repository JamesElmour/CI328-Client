class NetworkedBrick extends Component
{
    constructor(opts)
    {
        super(opts);
        this.health = this.getOpt("health", Number, 3);
    }
}