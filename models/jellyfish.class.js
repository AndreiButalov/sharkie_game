class JellyFish extends MovableObject {

    frequency = 0.09;
    amplitude = 12;
    isDead = false;
    height = 100;
    width = 100;  


    offset = {
        top: 10,
        left: 0,
        right: 135,
        bottom: -10
    }


    JELLYFISH_SHWIM = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];


    JELLYFISH_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ];


    constructor(x) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.JELLYFISH_SHWIM);
        this.loadImages(this.JELLYFISH_DEAD);
        this.x = x;
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;
        this.animateJellyFish();
        this.applySwim()
    }


    animateJellyFish() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();            
            }
        }, 1000 / 60);    

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.JELLYFISH_DEAD);
            } else {
                this.playAnimation(this.JELLYFISH_SHWIM);
            }
        }, 200);
    }

    
    jellyFishDead() {
        this.isDead = true;
    }
}