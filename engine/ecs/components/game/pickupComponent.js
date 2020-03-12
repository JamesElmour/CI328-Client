/**
 * Base pickup component class for all player pickups.
 */
class Pickup extends Component
{
    /**
     * After constructor is ran, extract data from opts passed to it.
     */
    create()
    {
        super.create();
        this.setupComponent();
    }

    /**
     * Set up components required by pickups.
     */
    setupComponent()
    {
        // Get parent.
        let e = this.parent;

        // Create pickup collider
        this.collider = e.createComponent(Collider, {width: 64, height: 64, trigger: true});
        window.scene.colliderSystem.addComponent(this.collider);
    }

    /**
     * When the player picks up the pickup, run 'activate' and destroy this object.
     * @param {*} player 
     */
    pickedUp(player)
    {
        this.activate(player);
        this.parent.destroy = true;
    }

    /**
     * Empty function overridden by subclasses to provide functionality.
     * Breaks ECS(?)
     */
    activate(player)
    {}
}