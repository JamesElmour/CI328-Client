/**
 * Barrel components for modular gun system.
 */
class Barrel
{
    constructor(parent, player)
    {
        this.parent = parent;       // Gun owner
        this.player = player;       // Player
        this.accuracy = 1.0;        // Per-bullet accuracy
        this.speed = 1.0;           // Speed multiplier per bullet
        this.bulletsPerShot = 1;    // Number of bullets per shot
    }
}