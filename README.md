# CI328 Data Driven Networked Game Client
***Accompanying C# Server With Explanation: https://github.com/MicahRClarke/CI328-Server***

The multiplayer internet game coursework for my final year Internet Game Design module offered exciting new challenges. Through much research they were overcome, resulting in a robust game. This the custom JavaScript client component of the game's architecture.

## ECS Data Driven
An entity-component-system technique was decided upon at the project’s start. This was due to the large quantity of game objects that will need processing, and the rapid creation of said objects. As well as the reliability of the approach and performance boost compared to standard game object architectures. ECS allows for the game’s component execution order to be defined in the game’s creation process. The sprite rendering systems, for example, are executed last once the game’s entities have finished moving for the frame.

## Double Buffer 'Vsync'
While the ECS approach would ensure a high level of performance, there were still substantial differences in a game’s update loop. From 1ms to 5ms. This would result in substantial stutter that ruined the flow of the game. To combat this, I have implemented a proto double-buffer vsync solution utilizing two HTML5 canvases. The game renders to an invisible canvas buffer, which is then copied to the main visible canvas upon the next frame request. Then the game’s update loop is runs after the frame is presented. This moves the pause between frame request from the start of the frame till after it’s presented. However, it introduces 1 frame of latency, 16.66ms at 60fps. The more typical game object approach may result in bugs, such as colliders passing through each other, due to the uneven processing that game object based design offers. Additionally, the game constantly creates and deletes objects, by utilizing components and entities with limited code composing their form this decreases initialization and deletion time. Thus, improving performance.

## Collision Engine
Collision is a vital system composing the game’s architecture. However, it can greatly impact performance. To resolve this problem, only active colliders are processed and checked against all other colliders. Active colliders being colliders that move, such as player, enemies and bullets. To move entities that are colliding to a state where they aren’t, the rigidbody mover system detects collision direction and blocks further movement. It does this by collecting all colliders and generalising them to create collision data.
