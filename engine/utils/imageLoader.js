/**
 * Image loader class for loading and getting loaded images.
 */
class ImageLoader extends Base
{
    // Get data from opts.
    create()
    {
        this.images = this.getOpt("images", Object);                // Loaded images.
        this.loaded = this.getOpt("loaded", Array);                 // Array of loaded image URLs.
        this.loadingIndex = this.getOpt("loadingIndex", Number);    // Number of images to load.
        this.baseUrl = this.getOpt("baseUrl", String);              // Base URL of PIGMjs.

        super.create();
    }

    /**
     * Preload an image using the URL.
     * @param {String} url Will be used to load image and serve as unique identifier for loaded image.
     */
    loadImage(url)
    {
        // Prepare image.
        var image = new Image();

        // Set lambda on load method.
        image.onload = () =>
        {
            // Add image to loaded images object and array once loaded.
            this.images[image.src] = image;
            this.loaded.push(image.src);

            // Log image loaded.
            this.log(`Image [${image.src}] loaded.`);
            
            // Decrease images currently loading.
            this.loadingIndex--;
        };

        // Increase images currently loading.
        this.loadingIndex++;

        // Set image's source URL.
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