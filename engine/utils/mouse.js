class Mouse extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.canvas = this.getOpt("canvas");
        this.canvas.mouse = this;
        this.position = this.getOpt("position", Vector2);
        super.create();

        this.canvas.addEventListener("mousemove", function (e)
        {
            let set = (e) =>
            {
                let rect = this.getBoundingClientRect();
                let p = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };

                this.mouse.position = new Vector2(p.x, p.y);
            };

            set(e);
        }, false);
    }
}