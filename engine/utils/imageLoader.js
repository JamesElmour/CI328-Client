class ImageLoader extends Base
{
    constructor(opts)
    {
        super(opts);

        this.create();
    }

    create()
    {
        this.images = this.getOpt("images", Object);
        this.loaded = this.getOpt("loaded", Array);
        this.loadingIndex = this.getOpt("loadingIndex", Number);
        this.baseUrl = this.getOpt("baseUrl", String);

        this.logCreation();
    }

    /**
     * Preload an image using the URL.
     * @param {String} url Will be used to load image and serve as unique identifier for loaded image.
     */
    loadImage(url)
    {
        var image = new Image();

        image.onload = () =>
        {
            this.images[image.src] = image;
            this.loaded.push(image.src);

            console.log(`Image [${image.src}] loaded.`);
            this.loadingIndex--;
        };

        this.loadingIndex++;
        image.src = this.baseUrl + url;
    }

    /**
     * Check if image has been loaded.
     * @param {String} url URL of image to check for.
     */
    checkLoaded(url)
    {
        return this.opts["loaded"].indexOf(this.baseUrl + url) !== -1;
    }

    /**
     * Checks if image loader has loaded all images.
     */
    ready()
    {
        return this.loadingIndex === 0;
    }

    /**
     * Gets the loaded image with the given URL.
     * @param {String} url URL to get image for.
     */
    getImage(url)
    {
        url = this.baseUrl + url;
        return this.images[url];
    }
}