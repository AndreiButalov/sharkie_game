class Character extends MovableObject {


    SHARKIE_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',        
    ]

    currentImage = 0;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.SHARKIE_SWIM);
        this.animateCharacter();
    }

    animateCharacter() {
        setInterval(() => {
            let i = this.currentImage % this.SHARKIE_SWIM.length;
            let path = this.SHARKIE_SWIM[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }
    
    jump() {

    }
}