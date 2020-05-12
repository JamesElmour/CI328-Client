/**
 * 'Abstract' class containing functionality for sending and recieving data.
 */
class NetworkTransceiver
{
    constructor(manager)
    {
        this.manager = manager;
    }

    /**
     * Convert provided number into 2 bytes.
     * @param {*} number 
     */
    NumberToBytes(number)
    {
        let bits  = parseInt(number, 10).toString(2);
            bits  = (bits.length % 8) > 0 ? bits.padStart(bits.length + (8 - (bits.length % 8)), "0") : bits;
        let bytes = bits.match(/.{1,8}/g);

        return bytes;
    }
}