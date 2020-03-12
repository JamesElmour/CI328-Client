/**
 * Base enemy component class for enemy system.
 */
class Enemy extends Component
{
    /**
     * Enemy constructor.
     * @param {Object} gun (Gun), health (Number, optional), range (Number, optional), sprite (Image), defaultSprite (Image), hitSprite (Image).
     */
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Extract data from opts after constructor is ran.
     */
    create()
    {
        this.gun = this.getOpt("gun");                      // Enemy's current gun.
        this.health = this.getOpt("health", Number, 5);     // Health of enemy.
        this.range = this.getOpt("range", Number, 400);     // Range enemy can shoot player at.
        this.sprite = this.getOpt("sprite");                // Current sprite.
        this.defaultSprite = this.getOpt("defaultSprite");  // Default enemy sprite.
        this.hitSprite = this.getOpt("hitSprite");          // Sprite when enemy is hit.
        this.hitTime = 0;                                   // Last time enemy was hit.
        super.create();
    }
}