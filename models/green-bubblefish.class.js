class GreenBubbleFish extends Bubblefish {

    frequency = 0.09;
    amplitude = 12;


    BUBBLEFISH_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];


    BUBBLEFISH_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ];


    constructor(x) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = x;        
        this.speed = 0.3 + Math.random() * 0.5;        
        this.loadImages(this.BUBBLEFISH_SWIM);
        this.loadImages(this.BUBBLEFISH_TRANSITION);
        this.animateEnemy(this.BUBBLEFISH_SWIM);
    }   
    

    getTransition() {
        setInterval(() => {
            this.animateEnemy(this.BUBBLEFISH_TRANSITION);
        }, 200)
    }
}