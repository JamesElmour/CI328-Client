class Gun extends Component
{
    
    /**
     * Gun constructor.
     * @param {Object} bullet 
     */
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.direction = this.getOpt("direction", Vector2);
        this.fire = this.getOpt("fire", Boolean);
        this.bullet = this.getOpt("bullet");
        this.next = this.getOpt("next", Number);
        this.cooldown = this.getOpt("cooldown", Number, 150);
        super.create();
    }
}