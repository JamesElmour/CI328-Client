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

    precheck()
    {
        super.precheck();

        this.campos = window.scene.camera.getMatrix();
    }

    process(comp)
    {
        if(comp.visible && this.onscreen(comp.parent.position))
        {
            let matrix = this.camera.getMatrix();
            let pos = comp.parent.position;
            let image = comp.image;

            let drawPos = new Vector2(pos.x + matrix.x, pos.y + matrix.y);
            this.canvas.getContext("2d").drawImage(image, drawPos.x, drawPos.y);
        }
    }

    onscreen(p)
    {
        if(p.x > (-this.campos.x - 100) && p.x < (-this.campos.x + 1280) &&
           p.y > (-this.campos.y - 100) && p.y < (-this.campos.y + 720))
        {
            return true;
        }

        return false;
    }
}