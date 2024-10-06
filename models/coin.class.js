class Coin extends ObjectCollection {

    width = 40;
    height = 40;

    frequency = 0.09;
    amplitude = 3;

    IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    constructor(x) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES);
        this.x = x
        this.initialY = 90 + Math.random() * 300;
        this.y = this.initialY;
        this.applySwim();
        this.coinAnimate();
    }

    coinAnimate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300)
    }    
}