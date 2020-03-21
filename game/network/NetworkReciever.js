class NetworkReciever extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(data)
    {
        let position = data[0];
        
        if(data.length === 2)
        {
            let number = new Uint16Array(new Uint8Array([data[0], data[1]]).buffer.slice(0))
            position = number[0];
        }

        console.log("Position: " + position);

        if(window.pigm.scene !== undefined)
            if(window.pigm.scene.systems[0].components.length !== 0)
                window.pigm.scene.systems[0].components[0].parent.position.x = position;
    }
}