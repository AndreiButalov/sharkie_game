class RedBubbleFish extends Bubblefish {

    frequency = 0.09;
    amplitude = 14;
    isInTransition = false;
    isDead = false;


    BUBBLEFISH_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ];


    BUBBLEFISH_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ];


    BUBBLEFISH_TRANSITION_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png',
    ];


    BUBBLEFISH_DEAD = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png'
    ];


    constructor(x) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png');
        this.x = x;        
        this.speed = 0.5 + Math.random() * 0.2;
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;        
        this.loadImages(this.BUBBLEFISH_SWIM);
        this.loadImages(this.BUBBLEFISH_TRANSITION);
        this.loadImages(this.BUBBLEFISH_TRANSITION_SWIM);
        this.loadImages(this.BUBBLEFISH_DEAD);
        
    }

}