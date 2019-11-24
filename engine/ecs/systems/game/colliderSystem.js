class ColliderSystem extends System
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {

    }

    process(comp)
    {
        comp.colliding = false;

        if(!comp.static)
        {
            let c = this.components;

            for(let x = 0; x < c.length; x++)
            {
                let o = c[x];

                comp.colliding = (comp.rect.intersects(o.rect)) ? true : o.rect.intersects(comp.rect);

                if(comp.colliding)
                    break;
            }
        }
    }
}