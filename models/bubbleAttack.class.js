class BubbleAttack extends PoisonAttack {   

    IMAGES_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',
    ];


    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.loadImages(this.IMAGES_BUBBLE);        
        this.x = x;
        this.y = y;  
        this.trow(x, y );  
        this.poisonAnimate(this.IMAGES_BUBBLE); 
    } 

}