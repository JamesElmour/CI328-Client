/**
 * Door component for door system.
 */
class Door extends Component
{
    /**
     * Get data from opts, after constructor is called.
     */
    create()
    {
        super.create();

        this.open = this.getOpt("open", Boolean); // Track if door is open.
        
        // Create collider for door.
        this.createCollider();
    }

    /**
     * Automatically create and assign door.
     */
    createCollider()
    {
        // Have parent create required rectangle.
        let r = this.parent.createComponent(Rectangle, {width: 64, height: 64});

        // Parent create door collider.
        let c = this.parent.createComponent(Collider, {rect: r, static: false, ignore: ["playerbullet","enemybullet", "door"]});

        // Add collider to scene's system.
        window.scene.colliderSystem.addComponent(c);

        // Store collider.
        this.collider = c;
    }
}