/**
 * Player's health pickup.
 */
class HealthPickup extends Pickup
{
    /**
     * When the player picks up the health pickup.
     * @param {*} player 
     */
    activate(player)
    {
        // Increase player's max health by one.
        player.maxHealth++;

        // Restore half of current max health.
        player.health += Math.round(player.maxHealth * 0.5);

        // Cap current health to player's max health
        if(player.health > player.maxHealth)
            player.health = player.maxHealth;
    }
}