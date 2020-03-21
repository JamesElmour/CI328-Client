class NetworkReciever extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(data)
    {
        let position = data[0];

        if(window.pigm.scene !== undefined)
            window.pigm.scene.systems[0].components[0].parent.position.x = position;
    }
}