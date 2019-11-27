class RigidChecker extends System
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        super.create();

        this.mover = this.getOpt("mover");
    }

    cycle(dt)
    {
        this.components = this.mover.components;

        super.cycle(dt);
    }

    process(comp)
    {
        let c = comp.collider.collidedWith;

        if(c.length !== 0)
        {
            let op = new Vector2(0, 0); // Other position
            let os = new Vector2(0, 0); // Other size
            let x;
            
            for(x = 0; x < c.length; x++)
            {
                let o = c[x];
                let cp = o.parent.position;
                op.x += cp.x;
                op.y += cp.y;

                let cs = new Vector2(o.rect.width, o.rect.height);
                os.x += cs.x;
                os.y += cs.y;
            }

            os.x = os.x / x;
            os.y = os.y / x;
            op.x = (op.x / x) + (os.x / 2);
            op.y = (op.y / x) + (os.y / 2);

            let v = comp.velocity;
            let p = comp.previous;
            p.x += comp.collider.rect.width / 2;
            p.y += comp.collider.rect.height / 2;

            let cv = new Vector2(p.x - op.x, p.y - op.y); // Collision vector
            let cm = Math.abs(cv.x) + Math.abs(cv.y); // Collision magnitude
            cv.x = (cv.x / cm);
            cv.y = (cv.y / cm);
            cv = cv.round();

            v.x = (cv.x == 0) ? v.x : this.solve(cv.x, v.x);
            v.y = (cv.y == 0) ? v.y : this.solve(cv.y, v.y);

            comp.velocity = v;
        }
    }

    solve(d, x)
    {
        if(d < 0)
        {
            x = Math.min(x, 0);
        }
        else
        {
            x = Math.max(x, 0);
        }

        return x;
    }
}