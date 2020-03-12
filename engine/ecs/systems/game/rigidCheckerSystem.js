/**
 * System responsible for checking rigidbodies.
 */
class RigidChecker extends System
{
    create()
    {
        super.create();

        // Get the rigidbody mover.
        this.mover = this.getOpt("mover");
    }

    /**
     * When cycling, set components to mover's components.
     * @param {Number} dt Deltatime 
     */
    cycle(dt)
    {
        this.components = this.mover.components;

        super.cycle(dt);
    }

    /**
     * Process the given rigidbody.
     * @param {Rigidbody} rigidbody 
     */
    process(rigidbody)
    {
        let collidedWith = rigidbody.collider.collidedWith;

        if(collidedWith.length !== 0)
        {
            // Store positions of collision and size.
            let otherPosition = new Vector2(0, 0);
            let otherSize = new Vector2(0, 0);

            // Cycle through all colliding colliders.
            let counter;
            for(counter = 0; counter < collidedWith.length; counter++)
            {
                // Get other and its position.
                let other = collidedWith[counter];
                let position = other.parent.position;

                // Add collider position to other position.
                otherPosition.x += position.x;
                otherPosition.y += position.y;

                // Add the collider's size.
                otherSize.x += other.rect.width;
                otherSize.y += other.rect.height;
            }

            // Generalize collider size.
            otherSize.x = otherSize.x / counter;
            otherSize.y = otherSize.y / counter;

            // Generalize collider's position for calculation.
            otherPosition.x = (otherPosition.x / counter) + (otherSize.x / 2);
            otherPosition.y = (otherPosition.y / counter) + (otherSize.y / 2);

            // Get rigidbody's velocity and previous frame position.
            let velocity = rigidbody.velocity;
            let position = rigidbody.previous;
            
            // Offset position.
            position.x += rigidbody.collider.rect.width / 2;
            position.y += rigidbody.collider.rect.height / 2;

            // Get collision vector and normalize.
            let collisionVector = new Vector2(position.x - otherPosition.x, position.y - otherPosition.y);
            collisionVector = collisionVector.normalize();

            // Restrict rigidbody velocity depending on collision vector's position.
            velocity.x = (Math.abs(collisionVector.x) < 0.33) ? velocity.x : this.solve(collisionVector.x, velocity.x);
            velocity.y = (Math.abs(collisionVector.y) < 0.33) ? velocity.y : this.solve(collisionVector.y, velocity.y);

            // Set rigidbody velocity.
            rigidbody.velocity = velocity;
        }
    }

    /**
     * Sets the given velocity depending on given collision dimension.
     * @param {Number} collisionDimension 
     * @param {Number} velocityDimension 
     */
    solve(collisionDimension, velocityDimension)
    {
        if(collisionDimension < 0)
        {
            velocityDimension = Math.min(velocityDimension, 0);
        }
        else
        {
            velocityDimension = Math.max(velocityDimension, 0);
        }

        return velocityDimension;
    }
}