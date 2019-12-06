class Camera extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.position = this.getOpt("position", Vector2);
        this.following = this.getOpt("following", Entity);
        this.mouse =  this.getOpt("mouse");
        super.create();
    }

    update()
    {
        this.position = this.following.position;
    }

    getMatrix()
    {
        let matrix = new Vector2(0, 0);
        matrix.x = -this.position.x + 640;
        matrix.y = -this.position.y + 360;

        matrix.x -= (300 * (this.mouse.position.x - 640) / 640);
        matrix.y -= ((300 / 640) * 360) * ((this.mouse.position.y - 360) / 360);

        matrix.x = Math.round(matrix.x);
        matrix.y = Math.round(matrix.y);

        return matrix;
    }

    distanceToFollowing(pos)
    {
        let p = this.following.position;

        return Math.sqrt(Math.pow(pos.x - p.x, 2) + Math.pow(pos.y - p.y, 2));
    }

    directionToFollowing(v)
    {
        let p = this.position.clone();
        let v2 = v;
        let d = new Vector2(p.x - v2.x, p.y - v2.y);
        let m = Math.abs(d.x) + Math.abs(d.y);
        d = new Vector2(d.x * m, d.y * m);

        return d;
    }
}