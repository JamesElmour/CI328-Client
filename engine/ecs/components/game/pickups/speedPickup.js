/**
 * Speed increase pickup for player.
 */
class SpeedPickup extends Pickup
{
    /**
     * When the player picks up this pickup.
     * @param {*} player 
     */
    activate(player)
    {
        // Increase player speed by 20%
        player.speed = player.speed * 1.2;
    }
}