class DrawableObject {

    x = 0;
    y = 230;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * Loads an image from the specified path and assigns it to the `img` property.
     * 
     * @param {string} path - The file path or URL of the image to be loaded.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws the loaded image onto the specified canvas context at the character's position.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the image on.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Loads multiple images from the provided array of paths and stores them in the image cache.
     * 
     * @param {Array<string>} arr - An array of file paths or URLs of images to be loaded.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}