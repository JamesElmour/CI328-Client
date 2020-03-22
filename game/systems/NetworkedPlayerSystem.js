class NetworkedPlayerSystem extends PlayerSystem
{
    constructor(opts)
    {
        super(opts)

        this.speed = 200;
    }

    process(player)
    {
        //let altered = this.checkInput(player);
        this.move(player);
        this.sendMessage(player.parent.position.x);
    }

    move(player)
    {
        let position = player.parent.position;
        let newPos   = this.mouse.position.x;

        if(!Number.isNaN(newPos))
            position.x = newPos;

        position.x = Math.max(Math.min(position.x, 1280), 0);
    }

    sendMessage(direction)
    {
        // No negative directions.
        //direction = direction + 1;
        //let message = window.pigm.NetworkManager.Sender.playerMove(direction);
        //window.pigm.NetworkManager.sendMessage(message);
    }
}