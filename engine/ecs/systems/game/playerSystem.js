class PlayerSystem extends System
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.keyboard = this.getOpt("keyboard");

        super.create();
    }

    process(comp)
    {
        let e = comp.parent;
        let r = e.getComponent(RigidBody);
        let v = r.velocity;
        let s = comp.speed;

        v = new Vector2(0, 0);

        if(this.keyboard.key(65))
        {
            v.x = -s;
        }

        if(this.keyboard.key(68))
        {
            v.x = s;
        }

        if(this.keyboard.key(87))
        {
            v.y = -s;
        }

        if(this.keyboard.key(83))
        {
            v.y = s;
        }

        r.velocity = v;
    }
}