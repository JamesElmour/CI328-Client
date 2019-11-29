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

                if(comp.collidedWith.indexOf(o) === -1 && o !== comp && !comp.ignore.includes(o.parent.tag) && !o.ignore.includes(comp.parent.tag))
                {
                    let col = (comp.rect.intersects(o.rect)) ? true : o.rect.intersects(comp.rect);
                    
                    if(col)
                    {
                        console.log(`Entity collider [${comp.parent.name}] collided with [${o.parent.name}]`);

                        if(comp.static)
                        {
                            o.collidedWith.push(o);
                        }
                        else
                        {
                            o.staticCollision = false;
                        }
                    
                        if(o.static)
                        {
                            comp.collidedWith.push(o);
                        }
                        else
                        {
                            comp.staticCollision = false;
                        }

                        comp.colliding = true;
                        o.colliding = true;
                    }
                }
            }
        }
    }
}