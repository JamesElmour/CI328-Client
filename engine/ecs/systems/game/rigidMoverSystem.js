/**
 * System to move rigidbodies.
 */
class RigidMover extends System
{
    /**
     * Processs the given rigidbody.
     * @param {Rigidbody} rigid 
     */
    process(rigid)
    {
        // Get rigidbody's position, velocity and drag.
        let position = rigid.parent.position;
        let velocity = rigid.velocity;
        let drag = rigid.drag;

        // Store current position as previous position.
        rigid.previous = position.clone();

        // Recalculate rigidbody velocity after drag.
        velocity.x = velocity.x * (1 - (drag.x * this.dt));
        velocity.y = velocity.y * (1 - (drag.y * this.dt));

        // Update position by velocity.
        position.x += velocity.x * this.dt;
        position.y += velocity.y * this.dt;
    }
}