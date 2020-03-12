/**
 * Rigidbody component for rigidbody class.
 */
class RigidBody extends Component
{
    /**
     * RigidBody constructor.
     * @param {Object} velocity (Vector2), drag (Number 0 to 1), speed (Number), collider (Collider).
     */
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Ran after constructor, get data from passed opts in constructor.
     */
    create()
    {
        this.velocity = this.getOpt("velocity", Vector2);                   // Rigidbody's velocity.
        this.drag = this.getOpt("drag", Vector2, new Vector2(0.1, 0.1));    // Body's drag.
        this.previous = this.getOpt("previous", Vector2);                   // Previous frame location.
        this.collider = this.getOpt("collider", Object);                    // Collider attached to parent entity.

        super.create();
    }
}