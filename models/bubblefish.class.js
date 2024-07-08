class Bubblefish extends MovableObject {
    
    height = 100;
    width = 100;

    BUBBLEFISH_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];


    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.BUBBLEFISH_SWIM);
        // this.x = 200 + Math.random() * 370;
        this.x = 720;
        this.y = 60 + Math.random() * 300;
        this.speed = 0.3 + Math.random() * 0.5;
        this.animateEnemy();
    }

    animateEnemy() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.BUBBLEFISH_SWIM);
        }, 200);
    }

}