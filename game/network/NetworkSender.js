class NetworkSender extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(position)
    {
        let message = new NetworkMessage();
        message.opcode = message.OpCodes.PlayerMove;
        message.data   = this.NumberToBytes(position);

        return message;
    }
}