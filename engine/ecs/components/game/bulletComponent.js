/**
 * Bullet component for bullet system.
 */
class Bullet extends Component
{
    /**
     * Bullet constructor
     * @param {Object} damage (Number, optional), speed (Number), ignore (String array), shooter (Entity). 
     */
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Extract data from opts after constructor.
     */
    create()
    {
        this.damage = this.getOpt("damage", Number, 1); // Damage this bullet deals.
        this.speed = this.getOpt("speed", Number, 800); // Speed of bullet in pixels per second.
        this.ignore = this.getOpt("ignore", Array);     // Array of tags to ignore.
        this.shooter = this.getOpt("shooter");          // Shooting entity.
        this.direction = new Vector2(0, 0);             // Direction of bullet.

        super.create();
    }
}