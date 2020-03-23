class NetworkedBallSystem extends System
{
    constructor(opts)
    {
        super(opts);

        this.ComboCount = 0;
    }

    process(ball)
    {
        this.playerBounce(ball);
        this.wallBounce(ball);
        this.brickBounce(ball);
        this.move(ball);
    }

    move(ball)
    {
        let position = ball.parent.position;
        let velocity = new Vector2();
        velocity.x   = ball.direction.x * ball.speed * this.dt;
        velocity.y   = ball.direction.y * ball.speed * this.dt;

        position.x += velocity.x;
        position.y += velocity.y;
    }

    brickBounce(ball)
    {
        let collider = ball.parent.getComponent(Collider);

        if(this.hasCollidedWith(collider, "Brick"))
        {
            let brickIndex = collider.collidedTags.indexOf("Brick");
            let brick = collider.collidedWith[brickIndex];
            let brickPosition = brick.parent.position;
            let collisionVector = new Vector2(ball.parent.position.x - (brickPosition.x + 32), ball.parent.position.y - brickPosition.y).normalize();
            
            if(Math.abs(collisionVector.x) > 0.70)
            {
                ball.direction.x = -ball.direction.x;

                if(collisionVector.x < 0)
                {
                    ball.parent.position.x = brickPosition.x;
                }
                else
                {
                    ball.parent.position.x = brickPosition.x + 64;
                }
            }
            else
            {
                ball.direction.y = -ball.direction.y;

                if(collisionVector.y < 0)
                {
                    ball.parent.position.y = brickPosition.y;
                }
                else
                {
                    ball.parent.position.y = brickPosition.y + 16;
                }
            }
            
            this.ComboCount++;
        }
    }

    wallBounce(ball)
    {
        if(ball.parent.position.x < 0 || ball.parent.position.x > 1280)
        {
            ball.direction.x = -ball.direction.x;
            ball.parent.position.x = Math.max(Math.min(ball.parent.position.x, 1280), 0);
        }

        if(ball.parent.position.y < 360 || ball.parent.position.y > 720)
        {
            ball.direction.y = -ball.direction.y;
            ball.parent.position.y = Math.max(Math.min(ball.parent.position.y, 720), 360);
        }
    }

    playerBounce(ball)
    {
        let collider = ball.parent.getComponent(Collider);

        if(this.hasCollidedWith(collider, "Player"))
        {
            ball.parent.position.y = 656;
            ball.direction.y = -ball.direction.y;

            let player = collider.collidedWith[collider.collidedTags.indexOf("Player")].parent.getComponent(NetworkedPlayer);
            let playerPos = player.parent.position.x;
            let newDirection = (((ball.parent.position.x - playerPos) / 256) -0.5);
            ball.direction.x = newDirection;

            window["pigm"].scene.PowerUpSystem.GetPowerUp(this.ComboCount);
            this.ComboCount = 0;
        }
    }

    hasCollidedWith(collider, tag)
    {
        return collider.collidedTags.indexOf(tag) !== -1;
    }
}