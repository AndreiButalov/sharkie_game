class YouWinBackground extends FinalBackground {

    width = 720; 
    height = 480;

    IMAGE = ['img/6.Botones/Try again/Mesa de trabajo 1.png'];

    constructor() {
        super().loadImage('img/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loadImages(this.IMAGE);        
    }
}