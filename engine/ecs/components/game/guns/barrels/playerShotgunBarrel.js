/**
 * Player's shotgun barrel, maximum bullets but low accuracy and speed.
 */
class PlayerShotgunBarrel extends Barrel
{
    constructor()
    {
        super();
        this.accuracy = 0.30;
        this.speed = 0.66;
        this.bulletsPerShot = 8;
    }
}