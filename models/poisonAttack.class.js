class PoisonAttack extends MovableObject {

    width = 50;
    height = 60;
    frequency = 0.09;
    amplitude = 2;


    IMAGES_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'        
    ];
      

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.loadImages(this.IMAGES_POISON);        
        this.x = x;
        this.y = y;        
        this.poisonAnimate(this.IMAGES_POISON);
        this.trow(x, y);
        this.bubbleSwim();
    }

    
    poisonAnimate(image) {
        this.playAnimation(image);
    }   


    bubbleSwim() {
        let time = 0;
        setInterval(() => {
            this.y = this.y + Math.sin(time) * this.amplitude;
            time += this.frequency;
        }, 1000 / 25);
    }


    trow (x, y) {
        this.x = x + 80;
        this.y = y + 80;      

        setInterval(() => {
            this.x += 3;// speeed
        }, 50);
    }
}