class Player extends Component
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.speed = this.getOpt("Speed", Number, 450);
        this.camera = this.getOpt("Camera");

        super.create();

        this.camera.following = this.parent;
    }
}