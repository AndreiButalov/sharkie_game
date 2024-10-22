class ObjectCollection extends MovableObject {
    
    frequency = 0.09;
    amplitude;

    constructor() {
        super();
        this.applySwim();
    }    

    /**
     * Animates an object by playing its animation frames at a set interval.
     * 
     * @param {Array<string>} image - An array of image paths for the animation frames.
     */
    objecktAnimate(image) {
        setInterval(() => {
            this.playAnimation(image)
        }, 300)
    }
}