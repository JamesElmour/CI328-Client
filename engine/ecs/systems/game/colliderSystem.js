/**
 * System for processing colliders.
 */
class ColliderSystem extends System
{
    /**
     * Before processing, reset the collider's collision attributes.
     * @param {Collider} collider 
     */
    preprocess(collider)
    {
        collider.collidedWith = [];
        collider.collidedTags = [];
        collider.staticCollision = true;
        collider.colliding = false;
    }

    /**
     * Process the given collider.
     * @param {Collider} collider 
     */
    process(collider)
    {
        // If collider isn't static.
        if(!collider.static)
        {
            // Cycle through system components and check for collision.
            this.components.forEach(element => this.checkCollision(collider, element));
        }
    }

    /**
     * Returns if the two colliders can collide.
     * @param {Collider} collider 
     * @param {Collider} element 
     */
    checkCollision(collider, element)
    {
        // Check if collider and element can collide.
        if(this.canCollide(collider, element))
        {
            // If can, check and process their collision
            collider.colliding = this.processCollision(collider, element);
        }
    }

    /**
     * Detects if a collision between collider and element took place and processes it.
     * @param {Collider} collider 
     * @param {Collider} element 
     */
    processCollision(collider, element)
    {
        // Check if did collide.
        if(this.didCollide(collider, element))
        {
            //console.log(`Entity collider [${comp.parent.name}] collided with [${o.parent.name}]`);
        
            // Store collided with element and parent tag in current collider.
            collider.collidedWith.push(element);
            collider.collidedTags.push(element.parent.tag);

            element.collidedWith.push(collider);
            element.collidedTags.push(collider.parent.tag);
            
            // If element isn't static, set static collision attribute.
            if(!element.static)
            {
                collider.staticCollision = false;
            }
            
            // Return true if collided.
            return true;
        }

        return collider.colliding;
    }

    /**
     * Returns if collider and element can collide.
     * @param {Collider} collider 
     * @param {Collider} element 
     */
    canCollide(collider, element)
    {
        return (collider.collidedWith.indexOf(element) === -1 && element !== collider && !collider.ignore.includes(element.parent.tag));
    }

    /**
     * Returns if collider and element did collide.
     * @param {Collider} collider 
     * @param {Collider} element 
     */
    didCollide(collider, element)
    {
        return collider.rect.intersects(element.rect);
    }
}