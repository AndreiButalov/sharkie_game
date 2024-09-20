class BubbleAttack extends PoisonAttack {
    
    IMAGES_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',
    ];


    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.loadImages(this.IMAGES_BUBBLE);        
        this.x = x;
        this.y = y; 
        this.poisonAnimate();
        this.trow(x, y);       
        
    }

    poisonAnimate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BUBBLE)
        }, 200)
    } 

}