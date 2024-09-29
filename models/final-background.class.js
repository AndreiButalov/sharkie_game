class FinalBackground extends MovableObject {

    width = 720; 
    height = 480;

    IMAGE = ['img/6.Botones/Try again/Mesa de trabajo 1.png'];

    constructor() {
        super().loadImage('img/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loadImages(this.IMAGE);
        this.y = 0 - this.height;
        this.speed = 10;
        this.animation();        
    }

    animation() {
        const fallInterval = setInterval(() => {
            if(this.y < 480 -this.height){
                this.moveDown();
            } else {
                clearInterval(fallInterval);
            }
        }, 1000 / 60);
    }
}