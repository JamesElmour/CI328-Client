class Door extends Component
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.collider = this.getOpt("collider", Object);
        this.open = this.getOpt("open", Boolean);

        super.create();
    }
}