class NetworkReciever extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(data)
    {
        let position = data[0] + data[1];
        
    }
}