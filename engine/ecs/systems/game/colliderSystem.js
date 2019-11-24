class ColliderSystem extends System
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        super.create();
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

                //console.log(`Entity collider [${comp.parent.name}] collided with [${o.parent.name}]`);
                
                if(comp.colliding)
                    break;
            }
        }
    }
}