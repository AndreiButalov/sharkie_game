class FinalBackground extends MovableObject {
    
    width = 720; 
    height = 480;
    speed = 10;  
    
    IMAGE = ['img/6.Botones/Try again/Mesa de trabajo 1.png'];

    constructor() {   
        super().loadImage('img/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loadImages(this.IMAGE);    
        this.y = - 480;
        this.animationScreenDown();                
    }

    animationScreenDown() {
        const fallInterval = setInterval(() => {
            if(this.y < 0){
                this.moveDown();
            } else {
                clearInterval(fallInterval);
            }
        }, 1000 / 60);        
    }
}