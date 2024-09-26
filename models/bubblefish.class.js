class Bubblefish extends Enemies {

    constructor() {
        super();        
        this.animateEnemy();        
    }   
    
    
    triggerTransition() {
        if (!this.isInTransition) {
            this.isInTransition = true; 
            this.playAnimationOnce(this.BUBBLEFISH_TRANSITION, () => {
                this.playBubbleSwim();
            });
        }
    }

    
    playAnimationOnce(images, callback) {
        let index = 0;
        const interval = setInterval(() => {
            this.img = this.imageCache[images[index]];
            index++;
            if (index >= images.length) {
                clearInterval(interval);
                if (callback) callback(); 
            }
        }, 200);
    }


    playBubbleSwim() {
        setInterval(() => {
            this.playAnimation(this.BUBBLEFISH_TRANSITION_SHWIM);
        }, 200);
    }


    animateEnemy() {       
        setInterval(() => {
            this.moveLeft();            
        }, 1000 / 60);    

        setInterval(() => {
            if (!this.isInTransition) {
                this.playAnimation(this.BUBBLEFISH_SHWIM);
            }
        }, 200);
    }


    playBubbleFishDead() {       
        setInterval(() => {
            this.playAnimation(this.BUBBLEFISH_DEAD);
        }, 200);
    }

}