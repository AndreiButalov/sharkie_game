class Poison extends MovableObject {
    width = 50;
    height = 60;

    frequency = 0.09;
    amplitude = 4;
    x = 400;

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

    constructor() {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES);
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;
        this.applySwim();
        this.poisonAnimate();
    }

    poisonAnimate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200)
    } 
}