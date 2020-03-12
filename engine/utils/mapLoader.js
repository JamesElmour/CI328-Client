/**
 * Class that loads maps.
 */
class MapLoader extends Base
{
    create()
    {
        this.mapUrl = this.getOpt("mapUrl", String);                    // Map's URL.
        this.tsUrl = this.getOpt("tsUrl", String);                      // Tilset's URL.
        this.layers = this.getOpt("layers", Object);                    // Loaded map layers.
        this.tsLoaded = this.getOpt("tsLoaded", Boolean, false);        // If tileset is loaded.
        this.tsRequest = this.getOpt("tsRequest");                      // Request that fetches tileset data.
        this.tsData = this.getOpt("tsData");                            // Tileset data.
        this.tiles = this.getOpt("tiles", Array);                       // Prased tiles for loading.
        this.mapLoaded = this.getOpt("mapLoaded", Boolean, false);      // If map is loaded.
        this.mapRequest = this.getOpt("mapRequest");                    // Request that fetches the map data.
        this.mapData = this.getOpt("mapData");                          // Map data.
        this.width = this.getOpt("width", Number);                      // Width of map in tiles.
        this.height = this.getOpt("height", Number);                    // Height of map in tiles.
        this.sprites = this.getOpt("sprites", Array);                   // Sprites to load.
        this.loadedCallback = this.getOpt("loadedCallback", Function);  // Callback function for when map is loaded.
        this.objects = [];                                              // Objects loaded from the map to be created.
        this.il = this.getOpt("il");                                    // Image loader.
        this.ready = this.getOpt("ready", Boolean);                     // If map loader is ready.

        super.create();

        // Start by getting the tileset.
        this.getTileset();
    }

    /**
     * Create the request to fetch tileset file.
     */
    getTileset()
    {
        this.log("==== Loading Tilset ===");
        this.log(`Fetching tilset: [${this.tsUrl}]`);

        // Create and send the XML HTTP request for tileset data.
        this.tsRequest = new XMLHttpRequest();
        let xhr = this.tsRequest;
        xhr.onload = () => this.loadTileset();
        xhr.open("GET", this.tsUrl);

        // Send request.
        xhr.send();

    }
    
    /**
     * Extract the files to load from the tileset.
     */
    loadTileset()
    {
        // Log tileset has been found and will start loading.
        this.log(`Tilset found`);

        // Prase the tileset JSON data.
        this.tsData = JSON.parse(this.tsRequest.responseText);
        
        // Sprites that need to be loaded.
        let unloadedTiles = this.tsData.tiles;

        // Cycle through each tile and load it.
        unloadedTiles.forEach((element, index) =>
        {
            // Current tile to load.
            let currentTile = element;
            
            // Get the tile's file.
            let tileFile = unescape(currentTile.image).replace("../images/", "");

            // Add file URL to loaded tiles array.
            this.tiles[currentTile.id] = tileFile;

            // Parse loading.
            this.log(`Parsing tilesprite [${index}]: [${tileFile}]`);
        });

        // Flag tileset loaded.
        this.tsLoaded = true;

        // Load the map.
        this.getMap();
    }

    /**
     * Send request to get map file.
     */
    getMap()
    {
        // Load loading of the maps.
        this.log("==== Loading Map ===");
        this.log(`Fetching map: [${this.mapUrl}]`);
        
        // Send XML HTTP request for loading map.
        this.mapRequest = new XMLHttpRequest();
        let xhr = this.mapRequest;
        xhr.onload = () => this.loadMap();
        xhr.open("GET", this.mapUrl);
        xhr.send();
    }

    /**
     * Extract the map data from the file.
     */
    loadMap()
    {
        // Log map has been found.
        this.log(`Map found`)

        // Parse the map data from JSON.
        this.mapData = JSON.parse(this.mapRequest.responseText);
        
        // Store loaded map layers, width and height.
        this.layers = this.mapData.layers;
        this.width = this.mapData.width;
        this.height = this.mapData.height;

        // Cycle through loaded layers and create them.
        this.layers.forEach((element) => {

            // Create appropiate layer.
            if(this.isObjectLayer(element))
            {
                this.createObjectLayer(element);
            }
            else
            {
                this.createTileLayer(element);
            }
        });

        // Load the tileset sprites.
        this.loadSprites();
    }

    /**
     * Detects if the layer passed is an object layer.
     * @param {Layer} layer 
     */
    isObjectLayer(layer)
    {
        return (layer.objects !== undefined)
    }

    /**
     * Create the given object layer.
     * @param {Layer} layer 
     */
    createObjectLayer(layer)
    {
        // Log the object layer's creation.
        this.log(`Creating object layer [${layer.name}]`);

        // Get objects to load.
        let data = layer.objects;

        // Cycle through data and load the objects.
        data.forEach((element) => 
        {
            // Blank object to store attributes.
            let obj = {};

            // Store object position and type.
            obj.position = new Vector2(element.x + 32, element.y + 32);
            obj.type = element.type;

            // Push the object to be created by the scene.
            this.objects.push(obj);
        });
    }

    /**
     * Create the given tile layer.
     * @param {Layer} layer 
     */
    createTileLayer(layer)
    {
        // Log the tile layer's creation.
        this.log(`Creating tile layer [${layer.name}]`);

        // Grab data from the layer.
        let data = layer.data;

        // Parse the data, data being a number representing the tile.
        data.forEach((element, index) =>
        {
            // If the tile is not blank.
            if(element !== 0 && this.tiles[element - 1] !== undefined)
            {
                // Set the tile's position.
                let x = 64 * (index % this.width) + 32;
                let y = 64 * Math.floor(index / this.height) + 32;
                let pos = new Vector2(x, y);
                
                // Push the tile to be created by the scene.
                this.sprites.push({position: pos, sprite: this.tiles[element - 1], layer: layer.name});
                
                // Log the tile's parsing.
                this.log(`Parsing tile [${index}] at [${pos.toString()}] with [${element}][${this.tiles[element - 1]}]`);
            }
        });

        /*for(let t = 0; t < data.length; t++)
        {
            let d = data[t];

            if(d !== 0 && this.tiles[d - 1] !== undefined)
            {
                let x = 64 * (t % this.width) + 32;
                let y = 64 * Math.floor(t / this.height) + 32;
                let pos = new Vector2(x, y);
                
                this.sprites.push({position: pos, sprite: this.tiles[d - 1], layer: layer.name});
                //console.log(`Parsing tile [${t}] at [${pos.toString()}] with [${d}][${this.tiles[d - 1]}]`);
            }
        }*/
    }
    
    /**
     * Load the sprites from the tileset into the ImageLoader.
     */
    loadSprites()
    {
        this.log("Loading tiles");

        this.tiles.forEach((element) => 
        {
            // Load the tile into the image loader.
            if(element !== undefined)
            {
                this.il.loadImage(element);
            }
        });

        // Check if the image loader has loaded tiles.
        let checkLoad = () => window.setTimeout(() => this.il.ready() ? this.loaded() : checkLoad(), 10);
        checkLoad();
    }

    /**
     * After everything is finished loaded, set state to loaded.
     */
    loaded()
    {
        //console.log("Tiles loaded");
        this.ready = true;
        return;
    }
}