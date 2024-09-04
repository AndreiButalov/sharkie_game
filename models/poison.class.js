class Poison extends MovableObject {
    width = 50;
    height = 60;

    // frequency = 0.09;
    // amplitude = 4;

    // x = 400;

    IMAGES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'        
    ];

    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        // this.initialY = 60 + Math.random() * 300;
        // this.y = this.initialY;
        // this.applySwim();
        this.poisonAnimate();
        this.trow(100, 150)
    }

    poisonAnimate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200)
    } 

    trow (x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50)
    }
}