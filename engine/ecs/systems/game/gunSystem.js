/**
 * Gun system for processing a scene's gun components.
 */
class GunSystem extends System
{
    /**
     * Process the given gun component.
     * @param {Gun} gun 
     */
    process(gun)
    {
        // Detect if this gun is currently firing.
        if(this.canFire(gun))
        {
            // For each bullet in a shot, create a bullet.
            for(let i = 0; i < gun.barrel.bulletsPerShot; i++)
            {
                this.createBullet(gun, gun.barrel.accuracy, gun.barrel.speed, gun.trigger.damageMultiplier, gun.parent.tag);
            }
            
            // Update trigger's previously shot time.
            gun.trigger.previousTime = new Date().getTime();

            // Create shot sound effect.
            this.createShotSound(gun);
        }
    }

    /**
     * Return if the can fire.
     * @param {Gun} gun 
     */
    canFire(gun)
    {
        let trigger = gun.trigger;
        let time = new Date().getTime();

        return (gun.fire && (trigger.previousTime + trigger.cooldown) <= time);
    }

    /**
     * Create bullet with the given parameters.
     * @param {Gun} gun 
     * @param {Number} accuracy 
     * @param {Number} speed 
     * @param {Number} multiplier 
     * @param {String} faction 
     */
    createBullet(gun, accuracy, speed, multiplier, faction)
    {
        // Create the bullet's entity, set its tag and offset position.
        let entity = new Entity({position: gun.parent.position.clone(), tag: faction + "bullet"});
        entity.position.x += 16;
        entity.position.y += 16;
        
        // Create bullet sprite.
        let sprite = entity.createComponent(Sprite, {image: window.scene.il.getImage("projectiles/" + faction + ".png")});
        
        // Create the bullet component for the entity.
        let bullet = entity.createComponent(Bullet, {ignore: [faction, "playerbullet", "enemybullet"], shooter: gun.parent});
        
        // Set bullet direction, speed and damage multiplier.
        bullet.direction = this.getDirection(entity.position.clone(), accuracy, faction);
        bullet.speed = bullet.speed * speed;
        bullet.damage = multiplier;

        // Create collider for the bullet.
        let collider = entity.createComponent(Collider, {ignore: [faction, "playerbullet", "enemybullet"], width: 8, height: 8});

        // Add created components to their respective systems.
        window.scene.bulletSystem.addComponent(bullet);
        window.scene.spriteRenderer.addComponent(sprite);
        window.scene.colliderSystem.addComponent(collider);
    }

    /**
     * Calculate bullet direction, considering the gun's accuracy.
     * @param {Vector2} position 
     * @param {Number} accuracy 
     * @param {String} faction 
     */
    getDirection(position, accuracy, faction)
    {
        // Get bullet's initial direction.
        let direction = this.getDirectionToTarget(faction, position);
        direction = this.applyAccuracy(direction, accuracy);

        return direction;
    }

    /**
     * Get direction to target based on passed faction.
     * @param {String} faction 
     * @param {Vector2} positon 
     */
    getDirectionToTarget(faction, position)
    {
        let direction;

        // If gun owner is player, get direction to mouse pointer.
        if(faction === "player")
        {
            direction = window.scene.mouse.directionTo(position);
        }
        else // Otherwise get direction to player.
        {
            direction = window.scene.camera.directionToFollowing(position);
        }

        // Normalize direction.
        direction = direction.normalize();

        // Return direction.
        return direction;
    }

    /**
     * Apply accuracy to bullet direction.
     * @param {Vector2} direction 
     * @param {Number} accuracy 
     */
    applyAccuracy(direction, accuracy)
    {
        // If accuracy isn't perfect.
        if(accuracy !== 1)
        {
            // Affect direction by random amount, limited by the accuracy.
            direction.x = direction.x * 1 - ((Math.random() - 0.5) * (1 - accuracy));
            direction.y = direction.y * 1 - ((Math.random() - 0.5) * (1 - accuracy));
        }

        // Normalize direction.
        direction.normalize();

        // Return direction.
        return direction;
    }

    /**
     * Create shot sound effect for the gun.
     * @param {Gun} gun 
     */
    createShotSound(gun)
    {
        if(window.scene.muteSound)
        {
            let a = new Audio(window.location.href + '/assets/sounds/' + gun.shootSound + '.mp3');
            a.volume = 0.7;
            a.play();
        }
    }
}