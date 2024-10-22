class JellyFish extends Enemies {

    frequency;
    amplitude;
    isDead = false;


    offset = {
        top: 0,
        left: 0,
        right: 135,
        bottom: 0
    }


    constructor() {
        super();
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;
        this.animateJellyFish();
    }


    /**
     * Animates the jellyfish by moving it left at a regular interval.
     * If the game is paused, it stops moving and resets frequency and amplitude.
     * It also starts the death animation check for the jellyfish.
     */
    animateJellyFish() {
        setInterval(() => {
            if (!world.isGamePause) {
                if (!this.isDead) {
                    this.moveLeft();
                }
            } else {
                this.frequency = 0;
                this.amplitude = 0;
            }
        }, 1000 / 60);
        this.isJellyFishDeath();
    }


    /**
     * Checks the jellyfish's state at regular intervals to play the appropriate animation.
     * If the jellyfish is dead, it plays the dead animation; otherwise, if the game is not paused,
     * it plays the swimming animation.
     */
    isJellyFishDeath() {
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.JELLYFISH_DEAD);
            } else if (!world.isGamePause) {
                this.playAnimation(this.JELLYFISH_SWIM);
            }
        }, 200);
    }


    /**
     * Marks the jellyfish as dead, which triggers the dead animation during the next state check.
     */
    jellyFishDead() {
        this.isDead = true;
    }

}