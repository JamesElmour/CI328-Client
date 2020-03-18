class NetworkMessage
{
    constructor(supercode = 0, subcode = 0, data = [])
    {
        //this.SetupOpcodes();
        this.data      = data;
        this.supercode = supercode;
        this.subcode   = subcode;
    }

    
}