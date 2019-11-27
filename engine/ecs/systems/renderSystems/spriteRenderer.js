class SpriteRenderer extends System
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.canvas = this.getOpt("canvas");
        this.camera = this.getOpt("camera");
        this.oldCamPos = this.camera.clone(); 

        super.create();
    }

    process(comp)
    {
        if(comp.visible)
        {
            let matrix = this.camera.getMatrix();
            let pos = comp.parent.position;
            let image = comp.image;

            let drawPos = new Vector2(pos.x + matrix.x, pos.y + matrix.y);
            this.canvas.getContext("2d").drawImage(image, drawPos.x, drawPos.y);
        }
    }
}