class NetworkReciever extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(data)
    {
        let position = data[0];
        
        if(data.length === 2)
        {
            position = this.bytesToNumber(data[0], data[1]);
        }

        if(window.pigm.scene !== undefined)
            if(window.pigm.scene.systems[0].components.length !== 0)
                window.pigm.scene.systems[0].components[0].parent.position.x = position;
    }

    ballBounce(data)
    {
        let xPos    = this.bytesToNumber(data[0], data[1]);
        let yPos    = this.bytesToNumber(data[2], data[3]);
        let xBounce = this.bytesToNumber(data[4], data[5]);
        let yBounce = this.bytesToNumber(data[6], data[7]);

        if(window.pigm.scene !== undefined)
            if(window.pigm.scene.systems[0].components.length !== 0)
            {
                window.pigm.scene.systems[2].components[0].parent.position.x = xPos;
                window.pigm.scene.systems[2].components[0].parent.position.y = yPos;
                window.pigm.scene.systems[2].components[0].direction.x = -((xBounce - 100.0) / 100.0)
                window.pigm.scene.systems[2].components[0].direction.y = (yBounce - 100.0) / 100.0
            }
    }

    brickHit(data)
    {
        let x       = this.bytesToNumber(data[0], data[1]);
        let y       = this.bytesToNumber(data[2], data[3]);
        let health  = this.bytesToNumber(data[4], data[5]);

        window.pigm.scene.systems[3].components.forEach(brick =>
        {
            if(brick.parent.name === ("Brick_" + x + "_" + y))
            {
                brick.health = health;

                if(brick.health == 2)
                {
                    brick.parent.getComponent(Sprite).image = window.pigm.scene.systems[3].HitSprite;
                }
                else if(brick.health == 1)
                {
                    brick.parent.getComponent(Sprite).image = window.pigm.scene.systems[3].CriticalSprite;
                }
            }
        });
    }

    brickDestroyed(data)
    {
        let x       = this.bytesToNumber(data[0], data[1]);
        let y       = this.bytesToNumber(data[2], data[3]);
        let health  = this.bytesToNumber(data[4], data[5]);

        window.pigm.scene.systems[3].components.forEach(brick =>
        {
            if(brick.parent.name === ("Brick_" + x + "_" + y))
                brick.parent.destroy = true;
        });
    }

    bytesToNumber(b1, b2)
    {
        let number = new Uint16Array(new Uint8Array([b1, b2]).buffer.slice(0))
        return number[0];
    }
}