class NetworkTransceiver
{
    constructor(manager)
    {
        this.manager = manager;
    }

    NumberToBytes(number)
    {
        let bits  = parseInt(number, 10).toString(2);
            bits  = (bits.length % 8) > 0 ? bits.padStart(bits.length + (8 - (bits.length % 8)), "0") : bits;
        let bytes = bits.match(/.{1,8}/g);

        return bytes;
    }
}