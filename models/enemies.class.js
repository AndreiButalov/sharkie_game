class Enemies extends MovableObject {
    
    height = 100;
    width = 100;  
    
    offset = {
        top: 10,
        left: 0,
        right: 135,
        bottom: -10
    }

    constructor() {
        super();
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;
        this.applySwim(); 
    }
}