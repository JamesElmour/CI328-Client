class Base
{
    constructor(opts)
    {
        if(opts === undefined)
        {
            opts = {};
        }

        this.opts = opts;

        this.create();
    }

    create()
    {
        this.logCreation();
    }

    /**
     * Logs the creation and opts for the object.
     */
    logCreation()
    {
        console.log(`=== ${this.constructor.name} Created ===\n${this.toString()}`);
    }

    /**
     * Get object opt value, creating it if it doesn't exist.
     * 
     * @param {String} Name of opt 
     * @param {Class} Class of the opt, used to create opt if it doesn't exist. 
     */
    getOpt(name, type, value)
    {
        // Get the opt.
        let opt = this.opts[name];

        // If opt doesn't exist, create it.
        if(opt === undefined && type !== undefined)
        {
            switch (type)
            {
                case Vector2:
                    opt = new Vector2(0, 0);
                    break;
                case String:
                    opt = "";
                    break;
                case Number:
                    opt = 0;
                    break;
                case Array:
                    opt = [];
                    break;
                case Object:
                    opt = {};
                    break;
                case Boolean:
                    opt = false;
                    break;
                case Camera:
                    opt = new Camera({});
                    break;
                case Rectangle:
                    opt = new Rectangle({});
                    break;
                case Entity:
                    opt = new Entity({});
                    break;
                case Function:
                    opt = new Function();
                    break;
                default:
                    console.log(`ERROR: ${name} of type ${type} not created.`);
                    opt = null;
                    break;
            }
            
            if(value !== undefined)
            {
                opt = value;
            }

            this.opts[name] = opt;
        }

        return opt;
    }

    log(data)
    {
        console.log(data);
    }

    toString()
    {
        let str = "{\n";

        for (const [key, value] of Object.entries(this.opts))
        {
            str += (`'${key}': ${value.toString()}\n`);
        }

        str += "}";

        return str;
    }

    clone()
    {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}