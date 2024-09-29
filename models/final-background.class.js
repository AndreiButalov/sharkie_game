class FinalBackground extends MovableObject {
    
    width; 
    height;
    speed = 10;     

    constructor() {   
        super();    
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