class Collider extends Component
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.rect = this.getOpt("rectangle", Object, this.parent.createComponent(Rectangle, {}));
        this.static = this.getOpt("static", Boolean);
        this.colliding = this.getOpt("colliding", Boolean);
    }
}