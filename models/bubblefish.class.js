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

    currentImage = 0;

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.BUBBLEFISH_SWIM);
        this.x = 200 + Math.random() * 370;
        this.y = 60 + Math.random() * 300;
        this.animate();
        this.animateEnemy();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.4;
        }, 1000 / 60);
    }

    animateEnemy() {
        setInterval(() => {
            let i = this.currentImage % this.BUBBLEFISH_SWIM.length;
            let path = this.BUBBLEFISH_SWIM[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }

}