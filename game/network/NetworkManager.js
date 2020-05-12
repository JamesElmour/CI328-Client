/**
 * Network Manager to manage all incoming data.
 */
class NetworkManager extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Create the Network Manager.
     */
    create()
    {
        // Get the socket and set it up.
        this.WebSocket = this.getOpt("socket");
        this.PlayerMessages = true;

        this.States =
        {
            Connecting:    0,
            Connected:     1,
            Disconnected:  2
        }

        this.setupWebSocket();

        // Assign Network senders and recievers.
        this.Sender   = new NetworkSender(this);
        this.Reciever = new NetworkReciever(this);
    }

    /**
     * Setup the Websocket.
     */
    setupWebSocket()
    {
        // On connected to server, relay feedback to user.
        this.WebSocket.onopen = (e) =>
        {
            console.log("Connection established.");
            window.pigm.scene.FontRenderer.addText(new Vector2(32, 284), "Connected to server.", 2000);
        }

        // If error is recieved from WebSocket, dump it to console and inform user.
        this.WebSocket.onerror = (e) =>
        {
            console.log("Networking Error!");
            console.log(e);
            
            window.pigm.scene.FontRenderer.addText(new Vector2(32, 264), "Error: Cannot connect to server.", 2000);
        }

        // On message recieved, send it to be processed.
        this.WebSocket.onmessage = (data) => 
        {
            data.data.arrayBuffer().then(buffer => this.recieveData(buffer));
        };

        // If the connection has timed out, inform user.
        this.WebSocket.ontimeout = (e) =>
        {
            window.pigm.scene.FontRenderer.addText(new Vector2(32, 264), "Error: Cannot connect to server.", 2000);
        };
    }

    /**
     * Recieve and process the data.
     * @param {*} data 
     */
    recieveData(data)
    {
            data         = new Uint8Array(data);    // Data recieved.
        let superOp      = data[0];                 // Get super opcode.
        let subOp        = data[1];                 // Get sub opcode.
        let player       = (superOp > 127);         // If this message relates to this player.
        let messages     = [];                      // Decoded messages.
        let messageData  = [];                      // Current Message's data.
        let index        = 2;                       // Starting index to take data from.
            
            // Decode super opcode.
            superOp      = (superOp > 127) ? superOp - 128 : superOp; 
        
        // Gather message data from recieved message data.
        while(index < data.length)
        {
            let current = data[index];
            messageData.push(current);

            index++;
        }

        // Create decoded message and push it.
        let message = new NetworkMessage(superOp, subOp, messageData);
        messages.push(message);

        // Process decoded meessage.
        this.processMessages(messages, player)
    }

    /**
     * Process the provided messages.
     * @param {*} messages 
     * @param {*} isPlayer 
     */
    processMessages(messages, isPlayer)
    {
        messages.forEach(message =>
        {
            // Find appropiate functionality for decoded message.
            switch(message.superOp)
            {
                case 0:
                    if(message.subOp == 0)
                        this.PlayerMessages = true;
                    else if(message.subOp == 1)
                        this.PlayerMessages = false;
                    else if(this.PlayerMessages && message.subOp == 2)
                        this.won();
                    else if(this.PlayerMessages && message.subOp == 3)
                        this.lost();
                    else if(message.subOp == 4)
                        this.depackMessages(isPlayer, message.data);
                case 1:
                    this.Reciever.playerMove(isPlayer, message.data);
                    break;
                case 2:
                    this.ballMessages(isPlayer, message);
                    break;
                case 3:
                    this.brickMessages(isPlayer, message);
                    break;
            }
        });
    }

    /**
     * If message comes from a collated Message Queue, decode it.
     * @param {*} isPlayer 
     * @param {*} data 
     */
    depackMessages(isPlayer, data)
    {
        let x = 0;
        let superOp = 0;
        let subOp = 0;
        let messageData = [];
        let messages = [];

        for(let i = 0; i < data.length; i++)
        {
            let d = data[i];

            if(d !== 255)
            {
                if(x === 0)
                    superOp = d;
                
                if(x === 1)
                    subOp = d;
                
                if(x > 1)
                    messageData.push(d); 

                x++;
            }
            else
            {
                x = 0;
                superOp = (superOp > 127) ? superOp - 128 : superOp;

                let message = new NetworkMessage(superOp, subOp, messageData);
                this.processMessages([message], isPlayer);
            }
        }
    }

    /**
     * When the player has won, clear screen and add appropiate text.
     */
    won()
    {
        window.pigm.scene.BallSystem.clear();
        window.pigm.scene.PlayerSystem.clear();
        window.pigm.scene.BrickSystem.clear();

        window.pigm.scene.FontRenderer.addText(new Vector2(32, 660), "You Win!")
    }

    /**
     * When the player has lost, clear the screen and add appropiate text.
     */
    lost()
    {
        window.pigm.scene.BallSystem.clear();
        window.pigm.scene.PlayerSystem.clear();
        window.pigm.scene.BrickSystem.clear();

        window.pigm.scene.FontRenderer.addText(new Vector2(32, 660), "You Lost!")
    }

    /**
     * Find appropiate functionality for Ball Message.
     * @param {*} isPlayer 
     * @param {*} message 
     */
    ballMessages(isPlayer, message)
    {
        switch(message.subOp)
        {   
            case 0:
                this.Reciever.ballBounce(isPlayer, message.data);
                break;
            case 1:
                this.Reciever.ballCreate(isPlayer, message.data);
                break;
            case 2:
                this.Reciever.ballClear(isPlayer, message.data);
                break;
        }
    }

    /**
     * Find appropiate functionality for Brick Message.
     * @param {*} isPlayer 
     * @param {*} message 
     */
    brickMessages(isPlayer, message)
    {
        switch(message.subOp)
        {
            case 0:
                this.Reciever.brickHit(isPlayer, message.data);
                break;
            case 1:
                this.Reciever.brickDestroyed(isPlayer, message.data);
                break;
            case 2:
                this.Reciever.brickCreate(isPlayer, message.data);
                break;
            case 3:
                this.Reciever.brickClear(isPlayer, message.data);
                break;
        }
    }

    /**
     * Send the given Message to the Server.
     * @param {*} message 
     */
    sendMessage(message)
    {
        let supercode   = message.superOp;
        let subcode     = message.subOp;
        let stringData  = message.data;

        let sendingData = [stringData.length + 3, 1, supercode, subcode];
            stringData.forEach((data) => {sendingData.push(parseInt(data, 2))});
            sendingData = new Uint8Array(sendingData);

        this.WebSocket.send(sendingData);
    }

    /**
     * Convert 2 bytes into one number.
     * @param {*} b1 
     * @param {*} b2 
     */
    bytesToNumber(b1, b2)
    {
        let number = new Uint16Array(new Uint8Array([b1, b2]).buffer.slice(0))
        return number[0];
    }
}