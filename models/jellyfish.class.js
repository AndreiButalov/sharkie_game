class JellyFish extends Bubblefish {
    
    frequency = 0.09;
    amplitude = 12;
    
    BUBBLEFISH_SHWIM = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ]


    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.BUBBLEFISH_SHWIM);
        this.x = 200;
        this.y = 300;
    }
}