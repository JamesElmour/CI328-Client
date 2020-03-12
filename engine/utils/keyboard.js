/**
 * Keyboard processor class.
 */
class Keyboard extends Base
{
    /**
     * Load data from opts and add keydown listener.
     */
    create()
    {
        // Prepare keys object.
        this.keys = this.getOpt("keys", Object);

        // When key is pressed, store which key.
        window.addEventListener('keydown',
        (e) => this.toggle(e.keyCode, true),
        false);

        // When key is up, store which key.
        window.addEventListener('keyup',
        (e) => this.toggle(e.keyCode, false),
        false);

        super.create();
    }

    toggle(key, value)
    {
        this.keys[key] = value;
    }

    /**
     * Return if keycode is being pressed.
     * @param {Number} code 
     */
    key(code)
    {
        let down = this.keys[code];

        if(down === undefined)
            down = false;

        return down;
    }
}