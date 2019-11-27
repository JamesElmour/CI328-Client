class MapLoader extends Base
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.mapUrl = this.getOpt("mapUrl", String);
        this.tsUrl = this.getOpt("tsUrl", String);
        this.layers = this.getOpt("layers", Object);
        this.tsLoaded = this.getOpt("tsLoaded", Boolean, false);
        this.tsRequest = this.getOpt("tsRequest");
        this.tsData = this.getOpt("tsData");
        this.tiles = this.getOpt("tiles", Array);
        this.mapLoaded = this.getOpt("mapLoaded", Boolean, false);
        this.mapRequest = this.getOpt("mapRequest");
        this.mapData = this.getOpt("mapData");
        this.width = this.getOpt("width", Number);
        this.height = this.getOpt("height", Number);
        this.sprites = this.getOpt("sprites", Array);
        this.loadedCallback = this.getOpt("loadedCallback", Function);
        this.il = this.getOpt("il");
        this.ready = this.getOpt("ready", Boolean);

        super.create();

        this.getTileset();
    }

    /**
     * Create the request to fetch tileset file.
     */
    getTileset()
    {
        console.log("==== Loading Tilset ===");
        console.log(`Fetching tilset: [${this.tsUrl}]`);

        this.tsRequest = new XMLHttpRequest();
        let xhr = this.tsRequest;
        xhr.onload = () => this.loadTileset();
        xhr.open("GET", this.tsUrl);
        xhr.send();

    }
    
    /**
     * Extract the files to load from the tileset.
     */
    loadTileset()
    {
        console.log(`Tilset found`)
        this.tsData = JSON.parse(this.tsRequest.responseText);
        
        let unloadedTiles = this.tsData.tiles;

        for(var i = 0; i < unloadedTiles.length; i++)
        {
            let currentTile = unloadedTiles[i];
            let tileFile = unescape(currentTile.image).replace("../images/", "");

            this.tiles[currentTile.id] = tileFile;

            console.log(`Parsing tilesprite [${i}]: [${tileFile}]`);
        }

        this.tsLoaded = true;
        this.getMap();
    }

    /**
     * Send request to get map file.
     */
    getMap()
    {
        console.log("==== Loading Map ===");
        console.log(`Fetching map: [${this.mapUrl}]`);
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
        console.log(`Map found`)
        this.mapData = JSON.parse(this.mapRequest.responseText);
        this.layers = this.mapData.layers;
        this.width = this.mapData.width;
        this.height = this.mapData.height;

        for(let l = 0; l < this.layers.length; l++)
        {
            let layer = this.layers[l];
            let data = layer.data;

            console.log(`Creating layer [${layer.name}]`);

            for(let t = 0; t < data.length; t++)
            {
                let d = data[t];

                if(d !== 0 && this.tiles[d - 1] !== undefined)
                {
                    let x = 64 * (t % this.width) + 32;
                    let y = 64 * Math.floor(t / this.height) + 32;
                    let pos = new Vector2(x, y);
                    
                    this.sprites.push({position: pos, sprite: this.tiles[d - 1], layer: layer.name});
                    console.log(`Parsing tile [${t}] at [${pos.toString()}] with [${d}][${this.tiles[d - 1]}]`);
                }
            }
        }

        this.loadSprites();
    }
    
    /**
     * Load the sprites from the tileset into the ImageLoader.
     */
    loadSprites()
    {
        console.log("Loading tiles");

        for(let s = 0; s < this.tiles.length; s++)
        {
            let t = this.tiles[s];

            if(t !== undefined)
            {
                this.il.loadImage(t);
            }
        }

        let checkLoad = () => window.setTimeout(() => this.il.ready() ? this.loaded() : checkLoad(), 10);
        checkLoad();
    }

    /**
     * After everything is finished loaded, set state to loaded.
     */
    loaded()
    {
        console.log("Tiles loaded");
        this.ready = true;
        return;
    }
}