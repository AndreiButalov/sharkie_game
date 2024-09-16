class GreenBubbleFish extends Bubblefish {

    frequency = 0.09;
    amplitude = 12;

    isInTransition = false;

    BUBBLEFISH_SHWIM = [
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

    BUBBLEFISH_TRANSITION_SHWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    ];

    constructor(x) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = x;        
        this.speed = 0.3 + Math.random() * 0.2;
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;        
        this.loadImages(this.BUBBLEFISH_SHWIM);
        this.loadImages(this.BUBBLEFISH_TRANSITION);
        this.loadImages(this.BUBBLEFISH_TRANSITION_SHWIM);
        this.animateEnemy();
    }

    
    // triggerTransition() {
    //     if (!this.isInTransition) {
    //         this.isInTransition = true; 
    //         this.playAnimationOnce(this.BUBBLEFISH_TRANSITION, () => {
    //             this.playBubbleSwim();
    //         });
    //     }
    // }

    
    // playAnimationOnce(images, callback) {
    //     let index = 0;
    //     const interval = setInterval(() => {
    //         this.img = this.imageCache[images[index]];
    //         index++;
    //         if (index >= images.length) {
    //             clearInterval(interval);
    //             if (callback) callback(); 
    //         }
    //     }, 200);
    // }


    // playBubbleSwim() {
    //     setInterval(() => {
    //         this.playAnimation(this.BUBBLEFISH_TRANSITION_SHWIM);
    //     }, 200);
    // }


    // animateEnemy() {       
    //     setInterval(() => {
    //         this.moveLeft();            
    //     }, 1000 / 60);    

    //     setInterval(() => {
    //         if (!this.isInTransition) {
    //             this.playAnimation(this.BUBBLEFISH_SHWIM);
    //         }
    //     }, 200);
    // }
}