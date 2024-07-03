class Light extends MovableObject{

    height = 480;
    width = 1440;
    y = 0;   
    speed = 0.35; 

    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/COMPLETO.png');
        this.x = 50 + Math.random() * 300;
        this.animate();
    }

    animate() {
       this.moveLeft();
    }
}