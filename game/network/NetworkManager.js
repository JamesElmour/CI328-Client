class NetworkManager extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.WebSocket = this.getOpt("socket");

        this.States =
        {
            Connecting:    0,
            Connected:     1,
            Disconnected:  2
        }

        this.setupWebSocket();
        this.Sender   = new NetworkSender(this);
        this.Reciever = new NetworkReciever(this);
    }

    setupWebSocket()
    {
        this.WebSocket.onopen = (e) =>
        {
            console.log("Connection established.")
        }

        this.WebSocket.onerror = (e) =>
        {
            console.log("Networking Error!");
            console.log(e);
        }

        this.WebSocket.onmessage = this.recieveData;
    }

    recieveData(data)
    {
        let length  = data.data.length;
        let decoded = [];
        
        for(let i = 0; i < length; i++)
        {
            decoded[i] = data.data.charCodeAt(i);
        }

        let opCode       = 0;
        let dataLength   = 0
            data         = [];
        let index        = 0;
        let messages     = [];
        while(decided.length !== 0)
        {
            let current = decoded.shift();

            if(index == 0)
            {
                opCode = current;
            }
            else if (index == 1)
            {
                dataLength = current;
            }
            else
            {
                data.push(current);
                dataLength--;
            }

            if(dataLength == 0)
            {
                let message = new NetworkMessage(opCode, data);
                messages.push(message);
                index = 0;
            }
            else
            {
                index++;
            }
        }

        this.processMessages(messages)
    }

    processMessages(messages)
    {
        messages.forEach(message =>
        {
            switch(message.opCode)
            {
                case message.OpCodes.PlayerMove:
                    this.Reciever.playerMove(data);
                    break;
            }
        });
    }

    sendMessage(message)
    {
        
        socket.send(new Uint8Array([3,1,x,y]))
    }
}