/**
 * Datatype to hold Message data.
 */
class NetworkMessage
{
    constructor(superOp = 0, subOp = 0, data = [])
    {
        this.data      = data;
        this.superOp   = superOp;
        this.subOp     = subOp;
    }
}