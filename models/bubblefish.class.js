class Bubblefish extends MovableObject {
    
    height = 100;
    width = 100;  
    
    offset = {
        top: 10,
        left: 0,
        right: 135,
        bottom: 0
    }


    constructor() {
        super();
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;
        this.applySwim(); 
    }
    
    
    animateEnemy(image) {       
        setInterval(() => {
            this.moveLeft();            
        }, 1000 / 60);    

        setInterval(() => {
            this.playAnimation(image);
        }, 200);
    }

}