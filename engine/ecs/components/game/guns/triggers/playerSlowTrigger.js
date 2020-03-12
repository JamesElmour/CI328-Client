/**
 * Player's slow shot trigger, maximum wait between shots but 2x damage multiplier.
 */
class PlayerSlowTrigger extends Trigger
{
    constructor()
    {
        super();

        this.cooldown = 500;
        this.damageMultiplier = 2.0;
    }
}