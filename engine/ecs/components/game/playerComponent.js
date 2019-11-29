class Player extends Component
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.speed = this.getOpt("Speed", Number, 500);
        this.camera = this.getOpt("Camera");
        this.gun = this.getOpt("gun");
        super.create();

        this.camera.following = this.parent;
    }
}