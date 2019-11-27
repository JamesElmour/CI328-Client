class Rectangle extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        super.create();
        
        this.parent = this.getOpt("parent");

        let p = this.parent.position;
        this.x = this.getOpt("x", Number, p.x);
        this.y = this.getOpt("y", Number, p.y);
        this.width = this.getOpt("width", Number);
        this.height = this.getOpt("height", Number);

        this.update();
    }

    update()
    {
        let p = this.parent.position;

        this.x = p.x;
        this.y = p.y;
        this.x1 = Math.round(this.x);
        this.y1 = Math.round(this.y);
        this.x2 = Math.round(this.x + this.width);
        this.y2 = Math.round(this.y + this.height)
    }

    /**
     * Check to see if this rectangle intersects with another rectangle.
     * @param {Rectangle} other 
     */
    intersects(other)
    {
        this.update();
        other.update();

        if (this.x1 < other.x2 &&
            this.x2 > other.x1 &&
            this.y1 < other.y2 &&
            this.y2 > other.y1) {
             return true;
         }

         return false;
    }
}