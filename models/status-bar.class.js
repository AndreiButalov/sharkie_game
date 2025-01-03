class StatusBar extends DrawableObject {

    percentage = 100;

    IMAGES = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 59;
        this.width = 180;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value and updates the displayed image based on the current percentage.
     *
     * @param {number} percentage - The percentage value to set (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    
    /**
     * Resolves the index of the image to be displayed based on the current percentage.
     * The returned index corresponds to different percentage ranges:
     * - 0 for 0-20%
     * - 1 for 21-40%
     * - 2 for 41-60%
     * - 3 for 61-80%
     * - 4 for 81-99%
     * - 5 for 100%
     *
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImagesIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}