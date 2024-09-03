class Bubblefish extends MovableObject {
    
    height = 100;
    width = 100;  
    
    offset = {
        top: 10,
        left: 0,
        right: 115,
        bottom: 0
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