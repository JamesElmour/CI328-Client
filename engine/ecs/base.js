/**
 * Base class that forms foundation for most PIGMjs ECS classes.
 */
class Base
{
    /**
     * Constructor that'll prepare opts for loading.
     * @param {Object} opts 
     */
    constructor(opts)
    {
        // If no opts are passed, set to empty object.
        if(opts === undefined)
        {
            opts = {};
        }

        // Set opts.
        this.opts = opts;

        this.create();
    }

    /**
     * Create method to be overridden subclasses, will load required data from opts.
     */
    create()
    {
        // Log the class's creation.
        this.logCreation();
    }

    /**
     * Logs the creation and opts for the object.
     */
    logCreation()
    {
        this.log(`=== ${this.constructor.name} Created ===\n${this.toString()}`);
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
            // Check its type, and create blank version of it if no value is specified.
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
                    this.log(`ERROR: ${name} of type ${type} not created.`);
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

    /**
     * Logs data to the console.
     * @param {String} data 
     */
    log(data)
    {
        // Disable logging due to performance.
        if(false)
        {
            console.log(data);
        }
    }

    /**
     * Convert this class to a string.
     */
    toString()
    {
        // Start string with bracket and newline.
        let str = "{\n";

        // For each piece of data in opts, log them to the console.
        for (const [key, value] of Object.entries(this.opts))
        {
            if(value !== undefined)
                str += (`'${key}': ${value.toString()}\n`);
        }

        // Close brackets.
        str += "}";

        // Return the string.
        return str;
    }

    /**
     * Method that returns a clone of the base entity.
     */
    clone()
    {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}