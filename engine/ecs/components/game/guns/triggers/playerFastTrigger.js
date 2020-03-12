/**
 * Player's fast trigger, very fast shot speed but reduces damage.
 */
class PlayerFastTrigger extends Trigger
{
    constructor()
    {
        super();

        this.cooldown = 100;
        this.damageMultiplier = 0.35;
    }
}