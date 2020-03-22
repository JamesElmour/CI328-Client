class NetworkedBallSystem extends System
{
    constructor(opts)
    {
        super(opts);
    }

    process(ball)
    {
        this.move(ball);
        this.wallBounce(ball);
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
}