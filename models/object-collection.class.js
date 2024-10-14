class ObjectCollection extends MovableObject {
    
    frequency = 0.09;
    amplitude;

    constructor() {
        super();
        this.applySwim();
    }    

    objecktAnimate(image) {
        setInterval(() => {
            this.playAnimation(image)
        }, 300)
    }
}