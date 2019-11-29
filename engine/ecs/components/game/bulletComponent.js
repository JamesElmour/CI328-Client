class Bullet extends Component
{
    /**
     * Bullet constructor
     * @param {Object} damage, direction, speed 
     */
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.damage = this.getOpt("damage", Number, 1);
        this.direction = this.getOpt("direction", Vector2);
        this.speed = this.getOpt("speed", Number, 800);
        this.ignore = this.getOpt("ignore", Array);

        super.create();
    }
}