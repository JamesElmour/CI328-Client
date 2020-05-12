/**
 * Player system to process Player components.
 */
class NetworkedPlayerSystem extends PlayerSystem
{
    constructor(opts)
    {
        super(opts)
    }

    /**
     * Process given Player.
     * @param {*} player 
     */
    process(player)
    {
        // Move Player and transmit new position.
        this.move(player);
        this.sendMessage(player.parent.position.x);
    }

    /**
     * Move player.
     * @param {*} player 
     */
    move(player)
    {
        // Get non-opponent Player.
        if(player.parent.name.indexOf("pponent") === -1)
        {
            // Update position to mouse position within boundaries.
            let position = player.parent.position;
            let newPos   = this.mouse.position.x;

            if(!Number.isNaN(newPos))
                position.x = newPos;

            position.x = Math.max(Math.min(position.x, 1280), 0);
        }
    }

    /**
     * Send Player's position to Server.
     * @param {*} position 
     */
    sendMessage(position)
    {
        let message = window.pigm.NetworkManager.Sender.playerMove(position);
        window.pigm.NetworkManager.sendMessage(message);
    }
}