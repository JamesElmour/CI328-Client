/**
 * Player's multi barrel, has decent accuracy with fast multiple bullets.
 */
class PlayerSpreadBarrel extends Barrel
{
    constructor()
    {
        super();
        this.accuracy = 0.85;
        this.speed = 1.25;
        this.bulletsPerShot = 3;
    }
}