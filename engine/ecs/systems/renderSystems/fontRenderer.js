/**
 * System to handle rendering all the font elements.
 */
class FontRenderer extends System
{
    // Get data from opts after constructor is ran.
    create()
    {
        super.create();
        
        // Get the canvas and its context.
        this.canvas = this.getOpt("canvas");
        this.context = this.canvas.getContext("2d");

        // Load the font.
        this.loadFont();
    }

    /**
     * Loads the font.
     */
    loadFont()
    {
        // Prepare all the characters for loading.
        this.characters =  
            ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", ":", ";", "<", "=", ">", "?", "@", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
            "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "", "[", "\\", "]", "~", " "];

        // Load the characters in the image loader.
        this.characters.forEach((char, index, array) =>
        {
            window.scene.il.loadImage("font/font_" + (index + 2) + ".png");
        });
    }

    /**
     * Process the given font element.
     * @param {Font} font 
     */
    process(font)
    {
        // Get the font's position.
        let pos = font.parent.position;

        // Get each character in the font's text.
        let chars = font.text.split("");

        // For each character, draw it to the screen.
        chars.forEach((char, index, array) =>
        {
            this.drawCharacter(char, index, pos);
        });
    }

    /**
     * Draw the given character to the screen at defined position.
     * @param {Char} char 
     * @param {Number} index 
     * @param {Vector2} pos 
     */
    drawCharacter(char, index, pos)
    {
        // Get the character's filename.
        let characterName = this.characters.indexOf(char.toLowerCase());

        // Get character's complete image path.
        let fileName = "font/font_" + (characterName + 2) + ".png";

        // Grab character image from image loader.
        let image = window.scene.il.getImage(fileName);

        // If the image exists.
        if(image !== undefined)
        {
            // Draw it to the screen, spacing each character by 32 pixels per character in the font's text.
            this.context.drawImage(image, pos.x + (index * 32), pos.y);
        }
    }
}