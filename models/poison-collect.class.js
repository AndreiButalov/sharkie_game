class PoisonCollect extends ObjectCollection {
    width = 50;
    height = 60;

    frequency = 0.09;
    amplitude = 12;

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
        this.loadImages(this.IMAGES)
        this.initialY = 350 + Math.random() * 50;
        this.y = this.initialY;
        this.x = 460 + Math.random() * 3000;
        this.applySwim();
        this.poisonAnimate();
    }


    poisonAnimate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200)
    }
    
}