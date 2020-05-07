class NetworkReciever extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(isPlayer, data)
    {
        let position = data[0];
        
        if(data.length === 2)
        {
            position = this.bytesToNumber(data[0], data[1]);
        }

        if(window.pigm.scene !== undefined)
            if(window.pigm.scene.systems[1].components.length !== 0)
            {   
                if(isPlayer)
                    window.pigm.scene.systems[1].components[0].parent.position.x = position;
                else
                    window.pigm.scene.systems[1].components[1].parent.position.x = position;
            }
    }

    ballBounce(isPlayer, data)
    {
        let xPos    = this.bytesToNumber(data[0], data[1]);
        let yPos    = this.bytesToNumber(data[2], data[3]);
        let id      = data[4];
        let xBounce = this.bytesToNumber(data[5], data[6]);
        let yBounce = this.bytesToNumber(data[7], data[8]);

        if(id !== 0)
        {
            let a = 2;
        }

        if(window.pigm.scene !== undefined)
            if(window.pigm.scene.systems[0].components.length !== 0)
            {
                let comp;

                if(isPlayer)
                {
                    comp = window.pigm.scene.systems[2].get("Ball_" + id);
                }
                else
                {
                    yPos -= 300;
                    comp = window.pigm.scene.systems[2].get("opponent_Ball_" + id);
                }

                comp.parent.position.x = xPos;
                comp.parent.position.y = yPos;
                comp.direction.x = -((xBounce - 100.0) / 100.0)
                comp.direction.y = -(yBounce - 100.0) / 100.0
            }
    }

    ballCreate(isPlayer, data)
    {
        let xPos    = this.bytesToNumber(data[0], data[1]);
        let yPos    = this.bytesToNumber(data[2], data[3]);
        let id      = data[4];
        let xBounce = this.bytesToNumber(data[5], data[6]);
        let yBounce = this.bytesToNumber(data[7], data[8]);
        
        let entity     = new Entity({name: "Ball_" + id, position: new Vector2(xPos, yPos)});
            entity.tag = "Ball";
        let ball       = entity.createComponent(NetworkedBall, {direction: new Vector2((xBounce - 100) / 100, (yBounce - 100) / 100)});
        let sprite     = entity.createComponent(Sprite, {image: window.pigm.scene.il.getImage("entities/Ball.png")});
        let rectangle  = entity.createComponent(Rectangle, {x: entity.position.x, y: entity.position.y, width: 16, height: 16});
        let collider   = entity.createComponent(Collider, {rect: rectangle, static: false});

        window.pigm.scene.BallSystem.addComponent(ball);
        window.pigm.scene.SpriteRenderer.addComponent(sprite);
        window.pigm.scene.ColliderSystem.addComponent(collider);

        if(!isPlayer)
        {
            entity.name = "opponent_" + entity.name;
            entity.position.y = 300;
        }

        setTimeout(() => entity.destroy = true, 10000);
    }

    brickHit(isPlayer, data)
    {
        let x       = this.bytesToNumber(data[0], data[1]);
        let y       = this.bytesToNumber(data[2], data[3]);
        let health  = this.bytesToNumber(data[4], data[5]);
        let name = ("Brick_" + x + "_" + y);

        if(!isPlayer)
        {
            name = "opponent_" + name;
        }

        window.pigm.scene.systems[3].components.forEach(brick =>
        {
            if(brick.parent.name === name)
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

    brickDestroyed(isPlayer, data)
    {
        let x       = this.bytesToNumber(data[0], data[1]);
        let y       = this.bytesToNumber(data[2], data[3]);
        let health  = this.bytesToNumber(data[4], data[5]);
        let name = ("Brick_" + x + "_" + y);

        if(!isPlayer)
        {
            name = "Opponent_" + name;
        }

        window.pigm.scene.systems[3].components.forEach(brick =>
        {
            if(brick.parent.name === name)
                brick.parent.destroy = true;
        });
    }

    bytesToNumber(b1, b2)
    {
        let number = new Uint16Array(new Uint8Array([b1, b2]).buffer.slice(0))
        return number[0];
    }
}