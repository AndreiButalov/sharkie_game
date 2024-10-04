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
        this.applySwim(); 
    }
}