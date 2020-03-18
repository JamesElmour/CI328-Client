class NetworkedPlayerSystem extends PlayerSystem
{
    constructor(opts)
    {
        super(opts)

        this.speed = 200;
    }

    process(player)
    {
        let newDirection = this.checkInput(player);
        this.move(player);
        this.sendMessage(newDirection);
    }

    checkInput(player)
    {
        let direction = player.direction;

        // Player moving left
        if(this.keyboard.key(65))
        {
            direction.x = (direction.x == 1) ? 0 : -1;
        }

        // Player moving right.
        if(this.keyboard.key(68))
        {
            direction.x = (direction.x == -1) ? 0 : 1;
        }

        return direction.x;
    }

    move(player)
    {
        let position = player.parent.position;
        let newPos   = player.direction.x * (this.speed * this.dt);

        if(!Number.isNaN(newPos))
            position.x += newPos;
    }

    sendMessage(direction)
    {
        // No negative directions.
        direction = direction + 1;
        let message = window.pigm.NetworkManager.Sender.playerMove(direction);
        window.pigm.NetworkManager.sendMessage(message);
    }
}