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

        this.WebSocket.onmessage = (data) => 
        {
            data.data.arrayBuffer().then(buffer => this.recieveData(buffer));
        };
    }

    recieveData(data)
    {
            data         = new Uint8Array(data);
        let length       = data.length;
        let superOp      = data[0];
        let subOp        = data[1];
        let messages     = [];
        let messageData  = [];
        let index        = 2;
        
        while(index < data.length)
        {
            let current = data[index];
            messageData.push(current);

            index++;
        }

        let message = new NetworkMessage(superOp, subOp, messageData);
        messages.push(message);

        this.processMessages(messages)
    }

    processMessages(messages)
    {
        messages.forEach(message =>
        {
            switch(message.superOp)
            {
                case 0:
                    this.Reciever.playerMove(message.data);
                    break;
            }
        });
    }

    sendMessage(message)
    {
        let supercode   = message.supercode;
        let subcode     = message.subcode;
        let stringData  = message.data;

        let sendingData = [stringData.length + 3, 1, supercode, subcode];
            stringData.forEach((data) => {sendingData.push(parseInt(data, 2))});
            sendingData = new Uint8Array(sendingData);

        this.WebSocket.send(sendingData);
    }
}