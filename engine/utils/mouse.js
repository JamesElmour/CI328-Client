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
        this.left = this.getOpt("left", Boolean);
        super.create();

        /*this.canvas.addEventListener("mousemove", function (e)
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
        }, false);*/

        this.canvas.addEventListener("mousedown", function (e)
        {
            let set = (e) =>
            {
                let b = e.button;

                if(b === 0)
                {
                    this.mouse.left = true;
                }

                if(b === 2)
                {
                    this.mouse.right = true;
                }
            };

            set(e);
        }, false);

        this.canvas.addEventListener("mouseup", function (e)
        {
            let set = (e) =>
            {
                let b = e.button;

                if(b === 0)
                {
                    this.mouse.left = false;
                }

                if(b === 2)
                {
                    this.mouse.right = false;
                }
            };

            set(e);
        }, false);
    }

    reset()
    {
        /*this.left = false;
        this.right = false;*/
    }

    directionTo(other)
    {
        let p = this.position.clone();
        p.x += window.scene.camera.position.x;
        p.y += window.scene.camera.position.y;
        let v2 = other;
        let d = new Vector2(p.x - v2.x, p.y - v2.y);
        d.x -= (1280 / 2);
        d.y -= (720 / 2);
        let m = Math.abs(d.x) + Math.abs(d.y);
        d = new Vector2(d.x * m, d.y * m);

        return d;
    }
}