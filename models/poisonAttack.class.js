class PoisonAttack extends MovableObject {
    width = 50;
    height = 60;


    IMAGES_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'        
    ];
      

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.loadImages(this.IMAGES_POISON);        
        this.x = x;
        this.y = y;        
        this.poisonAnimate();
        this.trow(x, y);
    }

    
    poisonAnimate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON)
        }, 200)
    }   


    trow (x, y) {
        this.x = x + 80;
        this.y = y + 90;       

        setInterval(() => {
            this.x += 10;
        }, 50)
    }
}