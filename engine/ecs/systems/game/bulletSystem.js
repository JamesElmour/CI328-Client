class BulletSystem extends System
{
    constructor(opts)
    {
        super(opts);
    }

    process(comp)
    {
        let p = comp.parent.position;

        p.x += comp.direction.x * comp.speed * this.dt;
        p.y += comp.direction.y * comp.speed * this.dt;

        let c = comp.parent.getComponent(Collider);

        if(c.colliding)
        {
            comp.parent.destroy = true;
        }
    }
}