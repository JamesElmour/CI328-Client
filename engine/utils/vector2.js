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
}