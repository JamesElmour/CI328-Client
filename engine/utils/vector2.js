/**
 * Simple 2D vector.
 */
class Vector2 extends Base
{
    /**
     * Constructor that creates Vector2 with given values.
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y)
    {
        let opts = {x: x, y: y};
        super(opts);
    }

    create()
    {
        this.x = this.getOpt("x", Number);
        this.y = this.getOpt("y", Number);
    }

    toString()
    {
        return "(x: " + this.x + ", y: " + this.y + ")";
    }

    /**
     * Return a rounded version of this vector.
     */
    round()
    {
        let v = new Vector2(this.x, this.y);
        v.x = Math.round(v.x);
        v.y = Math.round(v.y);

        return v;
    }

    /**
     * Returns version of vector with absolute values.
     */
    abs()
    {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    /**
     * Returns version of vector with normalized values.
     */
    normalize()
    {
        let v = this.abs();
        let m = v.x + v.y
        return new Vector2(this.x / m, this.y / m);
    }

    // Returns vector magnitude.
    magnitude()
    {
        return this.x + this.y;
    }
}