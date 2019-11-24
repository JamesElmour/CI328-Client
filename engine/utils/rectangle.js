class Rectangle extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.parent = this.getOpt("parent");
        this.x = this.getOpt("x", Number);
        this.y = this.getOpt("y", Number);
        this.width = this.getOpt("width", Number);
        this.height = this.getOpt("height", Number);
        this.x1 = this.getOpt("x", Number, this.x);
        this.y1 = this.getOpt("y", Number, this.y);
        this.x2 = this.getOpt("x2", Number, (this.x + this.width));
        this.y2 = this.getOpt("y2", Number, (this.y + this.height));
        super.create();
    }

    /**
     * Check to see if this rectangle intersects with another rectangle.
     * @param {Rectangle} other 
     */
    intersects(other)
    {
        if (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y) {
             return true;
         }

         return false;
    }
}