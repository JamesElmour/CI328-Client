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
        let p = e.position;

        if(this.keyboard.key(65))
        {
            p.x -= comp.speed;
        }

        if(this.keyboard.key(68))
        {
            p.x += comp.speed;
        }

        if(this.keyboard.key(87))
        {
            p.y -= comp.speed;
        }

        if(this.keyboard.key(83))
        {
            p.y += comp.speed;
        }

        e.position = p;
    }
}