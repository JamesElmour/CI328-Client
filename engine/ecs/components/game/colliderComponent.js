class Collider extends Component
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        
        this.parent = this.getOpt("parent");
        this.rect = this.getOpt("rect", Object, this.parent.createComponent(Rectangle, {}));
        this.static = this.getOpt("static", Boolean);
        this.colliding = this.getOpt("colliding", Boolean);
        
        super.create();
    }
}