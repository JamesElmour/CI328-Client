/**
 * Door system to process all door components.
 */
class DoorSystem extends System
{
    /**
     * Before processing, set door to visible and not open.
     * @param {Door} door 
     */
    preprocess(door)
    {
        door.parent.getComponent(Sprite).visible = true;
        door.open = false;
    }

    /**
     * Process the current door element.
     * @param {Door} door 
     */
    process(door)
    {
        // If door should open.
        if(this.shouldOpen(door))
        {
            // Set door to open and invisible.
            door.open = true;
            door.parent.getComponent(Sprite).visible = false;
        }
    }

    /**
     * Returns if door should open.
     * @param {Door} door 
     */
    shouldOpen(door)
    {
        let collider = door.collider;
        
        return collider.colliding && !collider.staticCollision
    }
}