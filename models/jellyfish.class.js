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


    animateJellyFish() {

        setInterval(() => {
            if (!world.isGamePause) {
                if (!this.isDead) {
                    // this.moveLeft();
                }
            } else {
                this.frequency = 0;
                this.amplitude = 0;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.JELLYFISH_DEAD);
            } else if (!world.isGamePause) {
                this.playAnimation(this.JELLYFISH_SHWIM);
            }
        }, 200);
    }


    jellyFishDead() {
        this.isDead = true;
    }
}