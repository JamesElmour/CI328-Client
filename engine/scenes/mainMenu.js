/**
 * Main menu scene.
 */
class MainMenu extends Scene
{

    /**
     * Create the scene.
     */
    create()
    {
        super.create();
        
        // Add title.
        this.addText(new Vector2(320, 50), "Untitled Shooter Game");

        // Add options.
        this.musicText = this.addText(new Vector2(200, 125), "M to mute music");
        this.soundText = this.addText(new Vector2(200, 175), "n to mute sounds");
        
        // Add control text.
        this.addText(new Vector2(200, 250), "Controls:");
        this.addText(new Vector2(100, 300), "WASD to move");
        this.addText(new Vector2(100, 350), "Aim and shoot with mouse");
        this.addText(new Vector2(100, 400), "1 to change barrel type");
        this.addText(new Vector2(100, 450), "2 to change trigger type");
        this.addText(new Vector2(320, 650), "Press SPACE to start");

        // If music and sound is enabled.
        this.music = true;
        this.sound = true;

        // Tracking if option button is pressed.
        this.musicPressed = false;
        this.soundPressed = false;
    }
    
    /**
     * Create text at position with given string.
     * @param {Vector2} position 
     * @param {String} text 
     */
    addText(position, text)
    {
        let parent = new Entity({position: position});
        let font = parent.createComponent(Font, {text: text})

        this.fontRenderer.addComponent(font);

        return font;
    }

    /**
     * Create font renderer system.
     */
    createSystems()
    {
        this.fontRenderer = new FontRenderer({canvas: this.bufferCanvas});
        this.systems.push(this.fontRenderer);
    }

    /**
     * Cycle through the systems.
     */
    cycleSystems()
    {
        super.cycleSystems();

        // If spacebar is pressed, change scene to gameplay level.
        if(this.keyboard.key(32))
        {
            window.pigm.changeScene(new GameLevel({canvas: this.canvas, bufferCanvas: this.bufferCanvas, il: this.il, muteMusic: this.music, muteSound: this.sound}));
        }

        // If the music toggle buttion is lifted.
        if(this.musicPressed && window.scene.keyboard.key(77))
        {
            // Switch music option value.
            this.music = !this.music;

            // Display relevant text.
            if(this.music)
            {
                this.musicText.text = "M to mute music";
            }
            else
            {
                this.musicText.text = "M to enable music";
            }
        }

        // If the music toggle buttion is lifted.
        if(this.soundPressed && window.scene.keyboard.key(78))
        {
            // Switch music option value.
            this.sound = !this.sound;

            // Display relevant text.
            if(this.sound)
            {
                this.soundText.text = "n to mute sound";
            }
            else
            {
                this.soundText.text = "n to enable sound";
            }
        }

        // Store if the music and/or sound button is pressed.
        this.musicPressed = window.scene.keyboard.key(77);
        this.soundPressed = window.scene.keyboard.key(78);
    }
}