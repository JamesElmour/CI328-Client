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
        comp.staticCollision = true;
        comp.colliding = false;
    }

    process(comp)
    {
        if(!comp.static)
        {
            let c = this.components;

            for(let x = 0; x < c.length; x++)
            {
                let o = c[x];

                if(comp.collidedWith.indexOf(o) === -1 && o !== comp && !comp.ignore.includes(o.parent.tag))
                {
                    let col = comp.rect.intersects(o.rect)
                    
                    if(col)
                    {
                        console.log(`Entity collider [${comp.parent.name}] collided with [${o.parent.name}]`);
                    
                        if(o.static)
                        {
                            comp.collidedWith.push(o);
                        }
                        else
                        {
                            comp.staticCollision = false;
                        }

                        comp.colliding = true;
                    }
                }
            }
        }
    }
}