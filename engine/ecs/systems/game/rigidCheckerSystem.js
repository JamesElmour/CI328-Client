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
            let v = comp.velocity;
            let p = comp.previous;            
            let o = c[0];
            let op = o.parent.position;

            let cv = new Vector2(p.x - op.x, p.y - op.y); // Collision vector
            let cm = Math.abs(cv.x) + Math.abs(cv.y); // Collision magnitude
            cv.x = Math.round(cv.x / cm);
            cv.y = Math.round(cv.y / cm);

            v.x = (cv.x == 0) ? v.x : 0;
            v.y = (cv.y == 0) ? v.y : 0;

            comp.velocity = v;
        }
    }
}