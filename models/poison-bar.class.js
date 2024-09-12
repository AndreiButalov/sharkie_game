class PoisonBar extends DrawableObject {
    percentage = 0;

    IMAGES = [
        'img/4. Marcadores/orange/0_ copia.png',
        'img/4. Marcadores/orange/20_ copia.png',
        'img/4. Marcadores/orange/40_ copia.png',
        'img/4. Marcadores/orange/60_ copia.png',
        'img/4. Marcadores/orange/80_ copia.png',
        'img/4. Marcadores/orange/100_ copia.png',
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = -5;
        this.width = 180;
        this.height = 50;
        this.setPercentage(0);
    }


    setPercentage(poisonCount) {
        let imageIndex = Math.floor(poisonCount);  //2
        imageIndex = Math.min(imageIndex, this.IMAGES.length - 1);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }
}