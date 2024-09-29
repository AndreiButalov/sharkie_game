class FinalBackground extends MovableObject {

    width = 720; 
    height = 480;

    IMAGE = ['img/6.Botones/Try again/Mesa de trabajo 1.png'];

    constructor() {
        super().loadImage('img/6.Botones/Try again/Mesa de trabajo 1.png');
        this.y = 480 - this.height;
        this.loadImages(this.IMAGE);
    }
}