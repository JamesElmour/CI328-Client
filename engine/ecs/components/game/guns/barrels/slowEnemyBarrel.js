/**
 * Enemy barrel for single-bullet shots with good accuracy but slow speed.
 */
class SlowEnemyBarrel extends Barrel
{
    constructor()
    {
        super();
        this.accuracy = 0.75;
        this.speed = 0.5;
    }
}