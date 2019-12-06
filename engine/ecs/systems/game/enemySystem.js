class EnemySystem extends System
{
    constructor(opts)
    {
        super(opts);
    }

    process(comp)
    {
        let p = comp.parent.position;
        let d = window.scene.camera.distanceToFollowing(p);
        let r = comp.range;
        
        if(d <= r) // If distance to player is within range
        {
            comp.gun.direction = window.scene.camera.directionToFollowing(comp.parent.position).normalize();
            comp.gun.fire = true;
        }
        else
        {
            comp.gun.fire = false;
        }
    }
}