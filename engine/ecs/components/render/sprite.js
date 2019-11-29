class Sprite extends RenderComponent
{
    /**
     * 
     * @param {Object} image (from il) 
     */
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.image = this.getOpt("image");
        this.width = this.getOpt("width", Number, this.image.width);
        this.height = this.getOpt("height", Number, this.image.height);
        super.create();
    }
}