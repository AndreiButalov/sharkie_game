class GreenJellyFish extends JellyFish {

    // frequency = 0.09;
    // amplitude = 12;    

    JELLYFISH_SWIM = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];


    JELLYFISH_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ];

    constructor(x) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.JELLYFISH_SWIM);
        this.loadImages(this.JELLYFISH_DEAD);
        this.x = x;
    }
}