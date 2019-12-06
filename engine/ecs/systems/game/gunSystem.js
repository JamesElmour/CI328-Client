class GunSystem extends System
{
    /**
     * Gun system constructor.
     * @param {Object} bulletSystem, mouse
     */
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.bulletSystem = this.getOpt("bulletSystem");
        super.create();
    }

    process(c)
    {
        let t = new Date().getTime();

        if(c.fire && c.next < t)
        {
            c.fire = false;
            c.next = t + c.cooldown;

            let d = c.direction;
            let e = new Entity({position: c.parent.position.clone(), tag: "bullet"});
            e.position.x += 16;
            e.position.y += 16;

            let b = c.bullet.clone();
            b.ignore.push("bullet");
            b.parent = e;

            let s = e.createComponent(Sprite, {image: window.scene.il.getImage("projectiles/basic.png")});
            b.direction = d;

            let r = e.createComponent(Rectangle, {width: 8, height: 8});
            let col = e.createComponent(Collider, {rect: r, ignore: b.ignore});

            window.scene.bulletSystem.addComponent(b);
            window.scene.spriteRenderer.addComponent(s);
            window.scene.colliderSystem.addComponent(col);
        }
    }
}