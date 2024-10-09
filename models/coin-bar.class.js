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


    setPercentage(coinCount) {
        let imageIndex = Math.floor(coinCount / 2);  //2
        imageIndex = Math.min(imageIndex, this.IMAGES.length - 1);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }  

}