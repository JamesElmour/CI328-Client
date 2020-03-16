class NetworkMessage
{
    constructor(opcode = null, data = [])
    {
        this.SetupOpcodes();
        this.data   = data;
        this.opcode = opcode;
    }

    SetupOpcodes()
    {
        this.OpCodes  =
        {
            Unknown:            0,
            Connected:          1,
            PlayerMove:         2,
            PlayerUsePowerUp:   3,
            PlayerReady:        4
        }
    }


}