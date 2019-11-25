class RigidMover extends System
{
    constructor(opts)
    {
        super(opts);
    }

    process(comp)
    {
        let a = comp.parent;
        let p = a.position;
        let v = comp.velocity;
        let d = comp.drag;

        v.x = v.x * (1 - (d.x * this.dt));
        v.y = v.y * (1 - (d.y * this.dt));

        p.x += v.x * this.dt;
        p.y += v.y * this.dt;

        a.position = p;
        comp.velocity = v;
    }
}