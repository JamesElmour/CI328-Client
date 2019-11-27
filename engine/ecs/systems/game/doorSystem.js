class DoorSystem extends System
{
    constructor(opts)
    {
        super(opts);
    }

    preprocess(comp)
    {
        comp.parent.getComponent(Sprite).visible = true;
        comp.open = false;
    }

    process(comp)
    {
        let c = comp.collider;

        if(c.colliding && !c.staticCollision)
        {
            c.open = true;
            c.parent.getComponent(Sprite).visible = false;
        }
    }
}