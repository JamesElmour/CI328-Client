/**
 * Base class for trigger component of modular gun system.
 */
class Trigger
{
    constructor()
    {
        this.cooldown = 200;            // Milliseconds between shots.
        this.damageMultiplier = 1.0;    // Damage multiplier per shot [UNUSED].
        this.previousTime = 0;          // Previous time of shot.
    }
}