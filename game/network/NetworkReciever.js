class NetworkReciever extends NetworkTransceiver
{
    constructor(manager)
    {
        super(manager);
    }

    playerMove(isPlayer, data)
    {
        let position = data[0];
        
        if(data.length === 3)
        {
            position = this.bytesToNumber(data[0], data[1]);
        }

        if(window.pigm.scene !== undefined)
            if(window.pigm.scene.systems[1].components.length !== 0)
            {   
                let player = window.pigm.scene.systems[1].components[0];
                let opponent = window.pigm.scene.systems[1].components[1];

                if(isPlayer)
                {
                    player.parent.position.x = position;
                }
                else
                {
                    opponent.parent.position.x = position;
                }

                if(isPlayer)
                {
                    if(player.lives !== data[2] && data[2] !== undefined)
                    {
                        if(player.lives > data[2])
                            window.pigm.scene.FontRenderer.addText(new Vector2(32, 600), "Life lost! " + data[2] + " remaining.", 1500);
                        else
                            window.pigm.scene.FontRenderer.addText(new Vector2(32, 600), "Life gained! " + data[2] + " remaining.", 1500);

                        player.lives = data[2];
                    }
                }
                else if(!isPlayer)
                {
                    if(opponent.lives !== data[2] && data[2] !== undefined)
                    {
                        if(opponent.lives > data[2])
                            window.pigm.scene.FontRenderer.addText(new Vector2(32, 300), "Life lost! " + data[2] + " remaining.", 1500);
                        else
                            window.pigm.scene.FontRenderer.addText(new Vector2(32, 300), "Life gained! " + data[2] + " remaining.", 1500);
                    }
                }
            }
    }

    ballBounce(isPlayer, data)
    {
        let xPos    = this.bytesToNumber(data[0], data[1]);
        let yPos    = this.bytesToNumber(data[2], data[3]);
        let id      = data[4];
        let xBounce = this.bytesToNumber(data[5], data[6]);
        let yBounce = this.bytesToNumber(data[7], data[8]);

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

    ballClear(isPlayer, data)
    {
        if (isPlayer)
        {
            window.pigm.scene.BallSystem.components.forEach(b =>
            {
                if(b.parent.name.indexOf("Opponent") !== -1)
                    b.parent.destroy = true;
            });
        }
        else
        {
            window.pigm.scene.BallSystem.components.forEach(b =>
                {
                    if(b.parent.name.indexOf("Opponent") === -1)
                        b.parent.destroy = true;
                });
        }
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
            name = "opponent_" + name;
        }

        let destroyedBrick;

        window.pigm.scene.systems[3].components.forEach(brick =>
        {
            if(brick.parent.name === name)
            {
                brick.parent.destroy = true;
                destroyedBrick = brick;
            }
        });

        // Create the explosion's parent entity.
        let entity = new Entity({position: destroyedBrick.parent.position.clone()});

        // Add a sprite to the entity and set its starting image.
        let sprite = entity.createComponent(Sprite, {image: window.pigm.scene.il.getImage("brick/destory-1.png")});

        // Add the explosion animator, passing through each frame and the sprite.
        let animator = entity.createComponent(Animator, {frames: [
            window.pigm.scene.il.getImage("brick/destory-1.png"),
            window.pigm.scene.il.getImage("brick/destory-2.png"),
            window.pigm.scene.il.getImage("brick/destory-3.png"),
            window.pigm.scene.il.getImage("brick/destory-4.png"),
            window.pigm.scene.il.getImage("brick/destory-5.png")
        ], sprite: sprite});
    }

    brickCreate(isPlayer, data)
    {
        let x = data[0];
        let y = data[1];
        let h = data[2];

        window.pigm.scene.createBrick(x, y, !isPlayer, h);

        if(!isPlayer)
            console.log("Creating brick: " + x + ", " + y);
    }

    brickClear(isPlayer, data)
    {
        window.pigm.scene.systems[3].components.forEach((x) =>
        {
            if((!isPlayer && x.parent.name.indexOf("opponent") !== -1) || (isPlayer && x.parent.name.indexOf("opponent") === -1))
            {
                x.parent.destroy = true;
            }
        });
    }

    bytesToNumber(b1, b2)
    {
        let number = new Uint16Array(new Uint8Array([b1, b2]).buffer.slice(0))
        return number[0];
    }
}