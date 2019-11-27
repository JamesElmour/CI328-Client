class Entity extends Base
{
    constructor(opts)
    {
        super(opts);

        if(opts.name === undefined)
        {
            opts["name"] = Math.random().toString(36).substr(2, 5);
        }

        this.create();
    }

    create()
    {
        this.position = this.getOpt("position", Vector2);
        this.name = this.getOpt("name");
        this.components = {};
        this.tags = this.getOpt("tags");

        super.logCreation();
    }

    /**
     * Attaches the given component to the Entity.
     * @param {Component} comp 
     */
    addComponent(comp)
    {
        this.components[comp.constructor.name] = comp;

        console.log(`Added [${comp.constructor.name}] to [${this.getOpt("name")}] with value [${comp.toString()}]`);
    }

    /**
     * Returns the component attached to Entity of given Component Class.
     * @param {Class} compClass 
     */
    getComponent(compClass)
    {
        return this.components[compClass.name];
    }

    createComponent(compClass, opts)
    {
        console.log(`Entity [${this.name}] is creating ${compClass.name} with values [${opts.toString()}].`);
        opts.parent = this;
        let c = new compClass(opts);
        
        this.addComponent(c);

        return c;
    }

    hasTag(tag)
    {
        return this.tags.indexOf(tag) !== -1; 
    }

    addTag(tag)
    {
        if(!this.hasTag(tag))
            this.tags.push(tag);
    }
}