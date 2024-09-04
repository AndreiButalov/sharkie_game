class Poison extends MovableObject {
    width = 50;
    height = 60;

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
        this.poisonAnimate();
        this.trow(x, y)
    }

    poisonAnimate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200)
    } 

    trow (x, y) {
        this.x = x + 80;
        this.y = y + 90;
        // this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 17;
        }, 50)
    }
}