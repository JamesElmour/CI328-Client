/**
 * Send data from the client to server.
 */
class NetworkSender extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    /**
     * Convert given position into player position Message.
     * @param {*} position 
     */
    playerMove(position)
    {
        let message       = new NetworkMessage(1, 1);
        message.data      = this.NumberToBytes(position);

        return message;
    }

    /**
     * Create message indicating PowerUp activation.
     */
    usePowerUp()
    {
        let message = new NetworkMessage(4, 1);

        return message;
    }
}