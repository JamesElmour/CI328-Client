class NetworkedBallSystem extends System
{
    constructor(opts)
    {
        super(opts);

        this.ComboCount = 0;
        this.DestroyAllBalls = false;
    }

    precheck()
    {
        super.precheck();

        if(this.DestroyAllBalls)
        {
            this.components.forEach((e) =>
            {
                e.parent.destroy = true;
            });

            this.DestroyAllBalls = false;
        }
    }

    /**
     * Process the Ball.
     * @param {*} ball 
     */
    process(ball)
    {
        // Bounce ball off Player, Wall, and Bricks.
        this.playerBounce(ball);
        this.wallBounce(ball);
        this.brickBounce(ball);

        // Move Ball.
        this.move(ball);
    }

    /**
     * Move the Ball given its direction, speed and DeltaTime.
     * @param {*} ball 
     */
    move(ball)
    {
        let position = ball.parent.position;
        let velocity = new Vector2();
        velocity.x   = ball.direction.x * ball.speed * this.dt;
        velocity.y   = ball.direction.y * ball.speed * this.dt;

        position.x += velocity.x;
        position.y += velocity.y;
    }

    /**
     * Bounce the Ball if it has collided with a Brick.
     * @param {*} ball 
     */
    brickBounce(ball)
    {
        let collider = ball.parent.getComponent(Collider);

        // If ball was not colliding with a Brick previously...
        if(this.hasCollidedWith(collider, "Brick"))
        {
            // Find index of 'Brick' tag in Collider's collided with tags.
            let brickIndex = collider.collidedTags.indexOf("Brick");
            let brick = collider.collidedWith[brickIndex];

            // Calculate Collision Vector between Ball and Brick.
            let brickPosition = brick.parent.position;
            let collisionVector = new Vector2(ball.parent.position.x - (brickPosition.x + 32), ball.parent.position.y - brickPosition.y).normalize();
            
            // If collision has occured on the Brick's side...
            if(Math.abs(collisionVector.x) > 0.70)
            {
                // ... Invert Ball's X movement direction.
                ball.direction.x = -ball.direction.x;

                // Set Ball's position to outside Brick.
                if(collisionVector.x < 0)
                {
                    ball.parent.position.x = brickPosition.x;
                }
                else
                {
                    ball.parent.position.x = brickPosition.x + 64;
                }
            }
            else // ... Otherwise
            {
                // ... Invert Ball's Y movement direction.
                ball.direction.y = -ball.direction.y;

                // Set Ball's position to outside Brick.
                if(collisionVector.y < 0)
                {
                    ball.parent.position.y = brickPosition.y;
                }
                else
                {
                    ball.parent.position.y = brickPosition.y + 16;
                }
            }
            
            // Increase combo.
            this.ComboCount++;
        }
    }

    /**
     * Process given Ball's wall bounce.
     * @param {*} ball 
     */
    wallBounce(ball)
    {
        if(ball.parent.position.x < 0 || ball.parent.position.x > 1280) // If Ball is outside left/right screen...
        {
            // Invert the Ball's X direction and cap within boundaries.
            ball.direction.x = -ball.direction.x;
            ball.parent.position.x = Math.max(Math.min(ball.parent.position.x, 1280), 0);
        }

        if(ball.parent.position.y < 360 || ball.parent.position.y > 720) // If Ball is outside tpo/bottom screen...
        {
            // Invert the Ball's Y direction and cap within boundaries.
            ball.direction.y = -ball.direction.y;
            ball.parent.position.y = Math.max(Math.min(ball.parent.position.y, 720), 360);
        }
    }

    /**
     * Process Ball bounced against Player.
     * @param {*} ball 
     */
    playerBounce(ball)
    {
        // Get Ball Collider
        let collider = ball.parent.getComponent(Collider);

        // Calculate if Ball has collided with Player.
        if(this.hasCollidedWith(collider, "Player"))
        {
            // Set Y position and invert direction.
            ball.parent.position.y = 656;
            ball.direction.y = -ball.direction.y;

            // Calculate Ball's position offset according to Player's position - for aiming.
            let player = collider.collidedWith[collider.collidedTags.indexOf("Player")].parent.getComponent(NetworkedPlayer);
            let playerPos = player.parent.position.x;
            let newDirection = (((ball.parent.position.x - playerPos) / 256) -0.5);
            ball.direction.x = newDirection;

            // Create PowerUp.
            window["pigm"].scene.PowerUpSystem.GetPowerUp(this.ComboCount);

            // Reset combo.
            this.ComboCount = 0;
        }
    }

    hasCollidedWith(collider, tag)
    {
        return collider.collidedTags.indexOf(tag) !== -1;
    }
}