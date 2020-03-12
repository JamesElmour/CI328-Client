class ButtonSystem extends System
{
    constructor(opts)
    {

    }

    create()
    {
        this.mouseRectangle = null;
        super.create();
    }

    precheck()
    {
        this.mouseRectangle = this.generateMouseRectangle();
    }

    process(button)
    {
        if(this.mouseClicking(button))
        {
            button.onClick();
        }
    }

    getRectangle(c)
    {
        return new Rectangle({parent: c.parent, width: c.width, height: c.height});
    }

    generateMouseRectangle()
    {
        let mouse = window.scene.mouse;
        let pos = mouse.position;
        
        return new Rectangle({position: pos, width: 1, height: 1});
    }

    mouseClicking(button)
    {
        let rect = this.getRectangle(button);

        if(rect.intersects(this.mouseRectangle))
        {
            if(window.scene.window.left)
            {
                return true;
            }
        }

        return false;
    }
}