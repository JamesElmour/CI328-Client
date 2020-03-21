class NetworkMessage
{
    constructor(superOp = 0, subOp = 0, data = [])
    {
        //this.SetupOpcodes();
        this.data      = data;
        this.superOp   = superOp;
        this.subOp     = subOp;
    }
}