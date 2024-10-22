class Bubblefish extends Enemies {

    isDead;
    frequency;
    amplitude;
    deadAnimationPlayed = false;

    constructor() {
        super();
        this.animateEnemy();
    }


    /**
     * Triggers the transition animation for the bubble fish.
     * If the fish is not currently in a transition, it plays the transition animation
     * and then starts the bubble swim animation.
     */
    triggerTransition() {
        if (!this.isInTransition) {
            this.isInTransition = true;
            this.playAnimationOnce(this.BUBBLEFISH_TRANSITION, () => {
                this.playBubbleSwim();
            });
        }
    }


    /**
     * Plays an animation once using the provided array of image identifiers.
     * Updates the fish's image at a set interval until all images have been displayed.
     * 
     * @param {Array} images - An array of image identifiers to animate.
     * @param {Function} callback - A callback function to be called after the animation completes.
     */
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


    /**
     * Plays the bubble swim animation for the fish.
     * If the fish is dead, it plays the death animation once.
     * Continues to play the swim animation as long as the game is not paused and the fish is not dead.
     */
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


    /**
     * Animates the enemy behavior.
     * Moves the enemy left if not dead and the game is not paused.
     * If dead, it plays the death animation once.
     * 
     * @returns {void}
     */
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


    /**
     * Plays the death animation for the fish.
     * Sets the flag indicating that the death animation has been played
     * and clears the current animation interval.
     */
    playDeathAnimation() {
        this.playAnimation(this.BUBBLEFISH_DEAD);
        this.deadAnimationPlayed = true;
        clearInterval(this.animationInterval);
    }


    /**
     * Sets the animation interval for the fish's swimming animation.
     * Plays the swimming animation while the fish is not dead and not in transition.
     * 
     * @returns {void}
     */
    setAnimationInterval() {
        this.animationInterval = setInterval(() => {
            if (!this.isDead && !this.isInTransition) {
                if (!world.isGamePause) {
                    this.playAnimation(this.BUBBLEFISH_SWIM);
                }
            }
        }, 200);
    }

    
    /**
     * Sets the fish's state to dead, triggering the death animation to play on the next update.
     * 
     * @returns {void}
     */
    playBubbleFishDead() {
        this.isDead = true;
    }

}