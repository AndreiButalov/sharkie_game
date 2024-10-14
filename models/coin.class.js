class Coin extends ObjectCollection {

    width = 40;
    height = 40;
    amplitude = 5;

    OBJECTIMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];
    

    constructor(x) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.OBJECTIMAGES);
        this.x = x
        this.initialY = 90 + Math.random() * 300;
        this.y = this.initialY;
        this.objecktAnimate(this.OBJECTIMAGES);
    }    
}