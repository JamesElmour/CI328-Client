class Enemy extends Component
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.gun = this.getOpt("gun");
        this.health = this.getOpt("health", Number, 5);
        this.range = this.getOpt("range", Number, 400);
        super.create();
    }
}