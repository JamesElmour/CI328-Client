/**
 * Enemy's slow shot, long wait between shooting.
 */
class SlowEnemyTrigger extends Trigger
{
    constructor()
    {
        super();
        this.cooldown = 500;
    }
}