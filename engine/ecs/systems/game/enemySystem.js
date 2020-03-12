/**
 * System to process enemy behaviour.
 */
class EnemySystem extends System
{
    /**
     * Process the given enemy.
     * @param {Enemy} enemy 
     */
    process(enemy)
    {
        this.shootPlayer(enemy);
        this.processHit(enemy);
    }

    shootPlayer(enemy)
    {
        // Get enemy position.
        let position = enemy.parent.position;

        // Get distance to player and enemy's range.
        let distanceToPlayer = window.scene.camera.distanceToFollowing(position);
        let range = enemy.range;
        
        // Set to not firing.
        enemy.gun.fire = false;

        // If distance to player is within range.
        if(distanceToPlayer <= range) 
        {
            // Set gun direction to point at player and start firing.
            enemy.gun.direction = window.scene.camera.directionToFollowing(enemy.parent.position).normalize();
            enemy.gun.fire = true;
        }
    }

    /**
     * Process if the enemy has been hit by player.
     * @param {Enemy} enemy 
     */
    processHit(enemy)
    {
        // Detect hit.
        this.detectHit(enemy);

        // Change back from hit sprite.
        this.changeFromHitSprite(enemy);
    }

    /**
     * Detect if enemy has been hit by a player's bullet.
     * @param {Enemy} enemy 
     */
    detectHit(enemy)
    {
        // Grab enemy collider.
        let collider = enemy.parent.getComponent(Collider);

        // Check if collider has been hit by a player's bullet.
        if(collider.collidedTags.indexOf("playerbullet") !== -1)
        {
            // If has reduce health.
            enemy.health--;
            
            // Change sprite to hit sprite and set delay till change back.
            enemy.sprite.image = enemy.hitSprite;
            enemy.hitTime = 0.1;

            // Player enemy hit sound effect.
            if(window.scene.muteSound)
            {
                let a = new Audio(window.location.href + '/assets/sounds/enemyHit.mp3');
                a.volume = 0.5;
                a.play();
            }

            // Check if enemy has died.
            this.checkDeath(enemy);
        }
    }

    /**
     * Detect and process enemy's change back to default sprite after being hit.
     * @param {Enemey} enemy 
     */
    changeFromHitSprite(enemy)
    {
        // If enemy was hit recently.
        if(enemy.hitTime > 0)
        {
            // Subject delatatime from remaining hit sprite display time.
            enemy.hitTime -= this.dt;

            // If should change back to default sprite.
            if(enemy.hitTime <= 0)
            {
                // Change enemy sprite image back to default sprite image.
                enemy.sprite.image = enemy.defaultSprite;
            }
        }
    }

    /**
     * Checks and processes enemy death.
     * @param {Enemy} enemy 
     */
    checkDeath(enemy)
    {
        // If the enemy has died.
        if(enemy.health <= 0)
        {
            // Create the death explosion.
            this.createExplosion(enemy);

            // Destroy this object.
            enemy.parent.destroy = true;

            // Give the player points.
            window.scene.player.points += 100;

            // Play the enemy death sound effect.
            if(window.scene.muteSound)
            {
                let audio  = new Audio(window.location.href + '/assets/sounds/death.mp3');
                audio .play();
            }

        }
    }

    /**
     * Creates the explosion for enemy death.
     * @param {Enemy} enemy 
     */
    createExplosion(enemy)
    {

        // Create the explosion's parent entity.
        let entity = new Entity({position: enemy.parent.position.clone()});

        // Add a sprite to the entity and set its starting image.
        let sprite = entity.createComponent(Sprite, {image: window.scene.il.getImage("particles/explosion/explosion_1.png")});

        // Add the explosion animator, passing through each frame and the sprite.
        let animator = entity.createComponent(Animator, {frames: [
            window.scene.il.getImage("particles/explosion/explosion_2.png"),
            window.scene.il.getImage("particles/explosion/explosion_3.png"),
            window.scene.il.getImage("particles/explosion/explosion_4.png"),
            window.scene.il.getImage("particles/explosion/explosion_5.png"),
            window.scene.il.getImage("particles/explosion/explosion_6.png"),
            window.scene.il.getImage("particles/explosion/explosion_7.png")
        ], sprite: sprite});

        // Add the sprite and animator to their respective systems.
        window.scene.spriteRenderer.addComponent(sprite);
        window.scene.animatorSystem.addComponent(animator);
    }
}