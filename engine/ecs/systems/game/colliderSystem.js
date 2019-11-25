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

    preprocess(comp)
    {
        comp.collidedWith = [];
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

                if(comp.collidedWith.indexOf(o) === -1 && o !== comp)
                {
                    comp.colliding = (comp.rect.intersects(o.rect)) ? true : o.rect.intersects(comp.rect);
                    
                    if(comp.colliding)
                    {
                        console.log(`Entity collider [${comp.parent.name}] collided with [${o.parent.name}]`);

                        comp.collidedWith.push(o);
                        o.collidedWith.push(o);
                    }
                }
            }
        }
    }
}