class PoisonCollect extends ObjectCollection {
    width = 50;
    height = 60;
    amplitude = 4;

    offset = {
        top: -10,
        left: 0,
        ridht: -130,
        bottom: 0
    }

    OBJECTIMAGES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];


    constructor(x) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.OBJECTIMAGES)
        this.initialY = 350 + Math.random() * 50;
        this.y = this.initialY;
        this.x = x;
        this.ObjecktAnimate(this.OBJECTIMAGES);
    }

}