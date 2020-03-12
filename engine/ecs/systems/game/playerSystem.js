/**
 * System that processes the player's component.
 */
class PlayerSystem extends System
{
    /**
     * 
     * @param {Object} opts keyboard (Keyboard), mouse (Mouse). 
     */
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        // Store the keyboard and mouse. 
        this.keyboard = this.getOpt("keyboard");
        this.mouse = this.getOpt("mouse");

        // Track if barrel/trigger keys are down (Limitation of keyboard input system)
        this.barrelKeyDown = false;
        this.triggerKeyDown = false;

        super.create();
    }

    /**
     * Process the scene's player component.
     * @param {Player} player 
     */
    process(player)
    {
        this.move(player);
        this.decreasePoints(player);
        this.switchBarrel(player);
        this.switchTrigger(player);
        this.shoot(player);
        this.hit(player);
        this.updateHealth(player);
        this.endLevel(player);
    }

    /**
     * Moves player according to user inputs by player's assigned speed.
     * @param {Player} player 
     */
    move(player)
    {
        // Get the player's rigidbody, velocity and speed.
        let rigid = player.parent.getComponent(RigidBody);
        let velocity = rigid.velocity;
        let speed = player.speed;

        // Set player's velocity to 0, 0.
        velocity = new Vector2(0, 0);

        // Move player left at speed.
        if(this.keyboard.key(65))
        {
            velocity.x = -speed;
        }

        // Move player right at speed.
        if(this.keyboard.key(68))
        {
            velocity.x = speed;
        }

        // Move player up at speed.
        if(this.keyboard.key(87))
        {
            velocity.y = -speed;
        }

        // Move player down at speed.
        if(this.keyboard.key(83))
        {
            velocity.y = speed;
        }

        // Update the player's velocity.
        rigid.velocity = velocity;
    }

    /**
     * Switch player gun's barrel according to user inputs.
     * @param {Player} player 
     */
    switchBarrel(player)
    {
        // If the '1' key has been pressed but no longer is.
        if(this.keyboard.key(49) && !this.barrelKeyDown)
        {
            // Switch barrel.
            player.barrelType++;

            // Cycle through the barrels.
            if(player.barrelType === 3)
            {
                player.barrelType = 0;
            }
           
            // Store the new barrel.
            let barrel;

            // Create the new barrel and switch the UI.
            switch(player.barrelType)
            {
                case 0:
                    barrel = new StandardBarrel();
                    player.barrelUI.text = "Standard";
                    break;
                case 1:
                    barrel = new PlayerSpreadBarrel();
                    player.barrelUI.text = "Multi";
                    break;
                case 2:
                    barrel = new PlayerShotgunBarrel();
                    player.barrelUI.text = "Shotgun";
                    break;
            }

            // Set the player's barrel.
            player.gun.barrel = barrel;
        }
        
        this.barrelKeyDown = this.keyboard.key(49);
    }

    /**
     * Switch player gun's trigger according to user inputs.
     * @param {Player} player 
     */
    switchTrigger(player)
    {
        // If the '2' key has been pressed but no longer is.
        if(this.keyboard.key(50) && !this.triggerKeyDown)
        {
            // Cycle through the available triggers.
            player.triggerType++;
            if(player.triggerType === 3)
            {
                player.triggerType = 0;
            }

            // Store the new trigger.
            let trigger;

            // Create the new trigger and switch the UI.
            switch(player.triggerType)
            {
                case 0:
                    trigger = new StandardTrigger();
                    player.triggerUI.text = "Standard";
                    break;
                case 1:
                    trigger = new PlayerFastTrigger();
                    player.triggerUI.text = "Speed";
                    break;
                case 2:
                    trigger = new PlayerSlowTrigger();
                    player.triggerUI.text = "Killer";
                    break;
            }

            // Set the player's trigger.
            player.gun.trigger = trigger;
        }

        this.triggerKeyDown = this.keyboard.key(50);
    }

    /**
     * Processes player's ability to shoot.
     * @param {Player} player 
     */
    shoot(player)
    {
        // Shoot when the left mouse button is pressed.
        if(this.mouse.left)
        {
            // If LMB is pressed, start firing and set the gun's direction from player's position to mouse cursor position.
            player.gun.fire = true;
            player.gun.direction = window.scene.mouse.directionTo(player.parent.position).normalize();
        }
        else
        {
            // Otherwise don't fire.
            player.gun.fire = false;
        }
    }

    /**
     * Detect if player has been hit.
     * @param {Player} player 
     */
    hit(player)
    {
        // Get the player's collider.
        let collider = player.parent.getComponent(Collider);

        // If the player has collided with an enemy bullet.
        if(collider.collidedTags.indexOf("enemybullet") !== -1)
        {
            // Shake the screen.
            window.scene.camera.shake = 30;
            
            // Decrease the player's health.
            player.health--;

            // Destroy the player if killed.
            if(player.health == 0)
            {
                player.parent.destroy = true;
                window.pigm.changeScene(new GameOverScene({canvas: window.scene.canvas, bufferCanvas: window.scene.bufferCanvas, il: window.scene.il, died: true, points: player.points}));
            }

            // Play player's hit sound effect.
            if(window.scene.muteSound)
            {
                let a = new Audio(window.location.href + '/assets/sounds/playerHit.mp3');
                a.volume = 0.1;
                a.play();
            }
        }
    }

    /**
     * Decreases player's points over time.
     * @param {Player} player 
     */
    decreasePoints(player)
    {
        // Decrease player's points at 10 points per second.
        player.points -= this.dt * 10;

        // Don't let points drop below 0.
        if(player.points < 0)
        {
            player.points = 0;
        }

        // Update the associated UI.
        player.pointUI.text = "Points: " + Math.round(player.points);
    }

    /**
     * Update UI text with player's health.
     * @param {Player} player 
     */
    updateHealth(player)
    {
        player.healthUI.text = "Health: " + player.health + "/" + player.maxHealth;
    }

    /**
     * Detects if the player has completed the level.
     * @param {Player} player 
     */
    endLevel(player)
    {
        // Dumb check if player has passed a point on the map.
        if(player.parent.position.y <= 1500)
        {
            window.pigm.changeScene(new GameOverScene({canvas: window.scene.canvas, bufferCanvas: window.scene.bufferCanvas, il: window.scene.il, died: false, points: player.points}));
        }
    }
}