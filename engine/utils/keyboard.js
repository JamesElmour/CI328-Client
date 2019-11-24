class Keyboard extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.keys = this.getOpt("keys", Object);

        window.addEventListener('keydown',
        (e) => this.toggle(e.keyCode, true),
        false);

        window.addEventListener('keyup',
        (e) => this.toggle(e.keyCode, false),
        false);

        super.create();
    }

    toggle(key, value)
    {
        this.keys[key] = value;
    }

    key(code)
    {
        let down = this.keys[code];

        if(down === undefined)
            down = false;

        return down;
    }
}