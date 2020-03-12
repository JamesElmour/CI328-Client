/**
 * System to process all pickup components.
 */
class PickupSystem extends System
{
    /**
     * Process a scene's pickup components.
     * @param {Pickup} pickup 
     */
    process(pickup)
    {
        // If the pickup has been picked up by the player.
        if(this.pickedUp(pickup))
        {
            // Run its pickup method.
            pickup.pickedUp(window.scene.player);
        }
    }

    /**
     * Detect if the player has picked up the pickup.
     * @param {Picjup} pickup 
     */
    pickedUp(pickup)
    {
        // Get collider.
        let collider = pickup.collider;

        // Return true if the collider has collided with the player.
        if(collider.collidedTags.includes("player"))
        {
            return true;
        }

        // If not return false.
        return false;
    }
}