class Bubblefish extends Enemies {

    isDead;
    frequency;
    amplitude;

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
        let deadAnimationPlayed = false;
        setInterval(() => {
            if (this.isDead) {
                if (!deadAnimationPlayed) {
                    this.playAnimation(this.BUBBLEFISH_DEAD);
                    deadAnimationPlayed = true;
                    clearInterval(this.animationInterval);
                }
            } else if(!world.isGamePause) {
                    this.playAnimation(this.BUBBLEFISH_TRANSITION_SHWIM);

                }
            // } else 
        }, 200);
    }


    animateEnemy() {
        let deadAnimationPlayed = false;

        setInterval(() => {
            if (!world.isGamePause) {
                if (!this.isDead) {
                    this.moveLeft();
                } else {
                    if (!deadAnimationPlayed) {
                        this.playAnimation(this.BUBBLEFISH_DEAD);
                        deadAnimationPlayed = true;
                        clearInterval(this.animationInterval);
                    }
                }
            } else {
                this.frequency = 0;
                this.amplitude = 0;
            }

        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (!this.isDead && !this.isInTransition) {
                if(!world.isGamePause) {
                    this.playAnimation(this.BUBBLEFISH_SHWIM);
                }
            }
        }, 200);
    }


    playBubbleFishDead() {
        this.isDead = true;
    }

}