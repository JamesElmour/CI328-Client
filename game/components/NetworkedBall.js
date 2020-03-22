class NetworkedBall extends Component
{
    constructor(opts)
    {
        super(opts);
        this.direction = this.getOpt("direction", Vector2);
        this.speed     = this.getOpt("speed",     Number,  600);
    }
}