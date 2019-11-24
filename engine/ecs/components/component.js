class Component extends Base
{
    constructor(opts)
    {
        super(opts);

        this.create();
    }

    create()
    {
        this.parent = this.getOpt("parent");
    }
}