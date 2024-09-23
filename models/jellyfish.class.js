class JellyFish extends MovableObject {
    
    frequency = 0.09;
    amplitude = 12;
///////////////////
    height = 100;
    width = 100;  
    
    offset = {
        top: 10,
        left: 0,
        right: 135,
        bottom: -10
    }
   /////////////////////// 
    BUBBLEFISH_SHWIM = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ]


    BUBBLEFISH_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ]


    constructor(x) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.BUBBLEFISH_SHWIM);
        this.loadImages(this.BUBBLEFISH_DEAD);
        this.x = x;
        this.animateJellyFish();
        // this.jellyFishDead();
    }

    animateJellyFish() {
        setInterval(() => {
            this.moveLeft();            
        }, 1000 / 60);    


        setInterval(() => {
            this.playAnimation(this.BUBBLEFISH_SHWIM)
        }, 200)
    }

    jellyFishDead() {
        console.log('hallo');
        setInterval(() => {
            this.playAnimation(this.BUBBLEFISH_DEAD)
        }, 200)
        
    }
}