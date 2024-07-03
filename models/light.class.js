class Light extends MovableObject{

    height = 480;
    width = 1440;
    y = 0;

    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/COMPLETO.png');
        this.x = 50 + Math.random() * 300;
        // this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}