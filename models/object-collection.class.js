class ObjectCollection extends MovableObject {
    
    frequency = 0.09;
    amplitude;

    constructor() {
        super();
        this.applySwim();
    }    

    ObjecktAnimate(image) {
        setInterval(() => {
            this.playAnimation(image)
        }, 300)
    }
}