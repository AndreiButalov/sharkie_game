class CoinBar extends DrawableObject {

    percentage;

    IMAGES = [
        'img/4. Marcadores/orange/0_  copia 2.png',
        'img/4. Marcadores/orange/20_  copia.png',
        'img/4. Marcadores/orange/40_  copia 2.png',
        'img/4. Marcadores/orange/60_  copia 2.png',
        'img/4. Marcadores/orange/80_  copia 2.png',
        'img/4. Marcadores/orange/100_ copia 2.png',
        
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 27;
        this.width = 180;
        this.height = 50;
        this.setPercentage(0);
    }


    /**
     * Sets the displayed image based on the coin count, which determines the percentage of coins collected.
     * The coin count is divided by 2 to find the corresponding image index.
     * If the index exceeds the available images, it is capped at the last image.
     * 
     * @param {number} coinCount - The total number of coins collected by the player.
     * @returns {void}
     */
    setPercentage(coinCount) {
        let imageIndex = Math.floor(coinCount / 2);
        imageIndex = Math.min(imageIndex, this.IMAGES.length - 1);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }  

}