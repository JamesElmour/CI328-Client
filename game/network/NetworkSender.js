class NetworkSender extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(position)
    {
        let message       = new NetworkMessage();
        message.supercode = 1;
        message.subcode   = 1;
        message.data      = this.NumberToBytes(position);

        return message;
    }
}