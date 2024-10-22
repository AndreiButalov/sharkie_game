class Bubblefish extends Enemies {

    isDead;
    frequency;
    amplitude;
    deadAnimationPlayed = false;

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
            if (this.isDead) {
                if (!this.deadAnimationPlayed) {
                    this.playDeathAnimation();
                }
            } else if (!world.isGamePause) {
                this.playAnimation(this.BUBBLEFISH_TRANSITION_SWIM);

            }
        }, 200);
    }


    animateEnemy() {
        setInterval(() => {
            if (!world.isGamePause) {
                if (!this.isDead) {
                    this.moveLeft();
                } else if (!this.deadAnimationPlayed) {
                    this.playDeathAnimation();
                }
            } else {
                this.frequency = 0;
                this.amplitude = 0;
            }
        }, 1000 / 60);
        this.setAnimationInterval();

    }


    playDeathAnimation() {
        this.playAnimation(this.BUBBLEFISH_DEAD);
        this.deadAnimationPlayed = true;
        clearInterval(this.animationInterval);
    }


    setAnimationInterval() {
        this.animationInterval = setInterval(() => {
            if (!this.isDead && !this.isInTransition) {
                if (!world.isGamePause) {
                    this.playAnimation(this.BUBBLEFISH_SWIM);
                }
            }
        }, 200);
    }




    playBubbleFishDead() {
        this.isDead = true;
    }

}