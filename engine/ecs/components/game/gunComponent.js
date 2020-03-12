/**
 * Base gun component for the modular gun system.
 */
class Gun extends Component
{
    /**
     * Gun constructor.
     * @param {Object} barrel (Barrel), trigger (Trigger), shotSound (String, optional).
     */
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        super.create();
        this.barrel = this.getOpt("barrel");                                // Gun's barrel.
        this.trigger = this.getOpt("trigger");                              // Gun's trigger.
        this.shootSound = this.getOpt("shootSound", String, "enemyShoot")   // Sound to play when firing.
        this.fire = false;                                                  // If gun should fire.
        
        // Assign trigger's parent to component parent.
        this.trigger.parent = this.parent; 
    }
}