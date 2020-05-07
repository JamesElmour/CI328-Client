class System extends Base
{
    /**
     * Load basic attributes after constructor is ran.
     */
    create()
    {
        // Prepare array for system's components.
        this.components = [];

        // Attribute to track if system has been dirtied.
        this.dirty = false;

        // Store current deltatime.
        this.dt = 0;

        super.create();
    }

    /**
     * Adds a component to the System.
     * @param {Component} comp 
     */
    addComponent(comp)
    {
        this.components.push(comp);
        this.log(`${comp.constructor.name} added to ${this.constructor.name}`);
        this.dirty = true;
    }

    /**
     * Removes a component from the system, if it exists.
     * @param {Component} comp 
     */
    removeComponent(comp)
    {
        let index = this.components.indexOf(comp);

        if(index !== -1)
        {
            this.components.splice(index, 1);
            this.log(`${comp.constructor.name} removed from ${this.constructor.name}`);
            this.dirty = true;
        }
        else
        {
            this.log(`${comp.constructor.name} doesn't exist in ${this.constructor.name}`);
        }
    }

    /**
     * Cycles through each component for processing.
     */
    cycle(dt)
    {
        // Set the current deltatime.
        this.dt = -dt;
        
        // If a component has been added to the system, sort it.
        if(this.dirty)
        {
            this.sort();
            this.dirty = false;
        }

        // Create array to handle active components.
        let activeComponents = [];
        

        // Cycle through the system's components for preprocessing, if it's set to destroy don't add to active components.
        for(let i = 0; i < this.components.length; i++)
        {
            let c = this.components[i];
            this.preprocess(c);

            if(!c.parent.destroy)
            {
                activeComponents.push(c);
            }
        }
        
        // Set current components to active components.
        this.components = activeComponents;

        // Run prechecks before processing components.
        this.precheck();

        // Process all active components.
        for(let i = 0; i < this.components.length; i++)
        {
            this.process(this.components[i]);
        }
        
    }

    get(name)
    {
        for(let i = 0; i < this.components.length; i++)
        {
            let c = this.components[i];

            if(c.parent.name === name)
                return c;
        }
    }

    /**
     * Method to sort system.
     */
    sort()
    {

    }

    /**
     * Run checks in the system before any processing or preprocessing is ran.
     */
    precheck()
    {

    }

    /**
     * Method to be overriden, runs preprocessing before component is processed.
     * @param {Component} comp 
     */
    preprocess(comp)
    {

    }

    /**
     * Method to be overwritten, processing each individual component in the system.
     * @param {Component} comp Component to process.
     */
    process(comp)
    {

    }

    clear()
    {
        for(let i = 0; i < this.components.length; i++)
        {
            this.components[i].parent.destroy = true;
        }
    }
}