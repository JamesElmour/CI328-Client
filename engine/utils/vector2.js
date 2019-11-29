class Vector2 extends Base
{
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

    round()
    {
        let v = new Vector2(this.x, this.y);
        v.x = Math.round(v.x);
        v.y = Math.round(v.y);

        return v;
    }

    abs()
    {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    normalize()
    {
        let v = this.abs();
        let m = v.x + v.y
        return new Vector2(this.x / m, this.y / m);
    }
}