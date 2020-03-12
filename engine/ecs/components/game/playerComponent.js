/**
 * Player component for player system.
 */
class Player extends Component
{
    /**
     * Player constructor.
     * @param {Object} Points (Number), Speed (Number), Camera (Camera), gun (Gun), health (Number),
     *                        maxHealth (Number), healthUI (Text), barrelUI (Text), triggerUI (Text), pointUI (Text).
     */
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Ran after constructor, extracts data from opts which are passed to constructor.
     */
    create()
    {
        this.points = this.getOpt("Points", Number, 0);             // Player's current points.
        this.speed = this.getOpt("Speed", Number, 650);             // Movement speed in pixels per second.
        this.camera = this.getOpt("Camera");                        // Scene's camera.
        this.gun = this.getOpt("gun");                              // Gun player is to use.
        this.health = this.getOpt("health", Number, 10);            // Player's current health.
        this.maxHealth = this.getOpt("maxHealth", Number, 10);      // Player's maximum health.
        this.healthUI = this.getOpt("healthUI");                    // UI element displaying player's health.
        this.barrelUI = this.getOpt("barrelUI");                    // UI element displaying barrel selection.
        this.triggerUI = this.getOpt("triggerUI");                  // UI element displaying trigger selection.
        this.pointUI = this.getOpt("pointUI");                      // UI element displaying player's points.
        this.barrelType = 0;                                        // Internal barrel type selected.
        this.triggerType = 0;                                       // Internet trigger type selected.
        super.create();

        // Make camera follow player.
        this.camera.following = this.parent;
    }
}