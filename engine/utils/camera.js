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

        return matrix;
    }
}