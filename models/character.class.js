class Character extends MovableObject {

    world;
    speed = 6;

    SHARKIE_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',        
    ]

    SHARKIE_STAND = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ]

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.SHARKIE_SWIM);
        this.loadImages(this.SHARKIE_STAND);
        this.animateCharacter();
    }


    animateCharacterSwim() {
        setInterval (() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && this.y > -70) {
                this.y -= this.speed;
            }

            if (this.world.keyboard.DOWN && this.y < 300) {
                this.y += this.speed;
            }

            this.world.camera_x = -this.x + 50;
        }, 1000 / 30);
    }


    animateCharacter() {
        this.animateCharacterSwim();

        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
                let i = this.currentImage % this.SHARKIE_STAND.length;
                let path = this.SHARKIE_STAND[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 230)

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {                
                let i = this.currentImage % this.SHARKIE_SWIM.length;
                let path = this.SHARKIE_SWIM[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }            
        }, 100);
    }   
    
    jump() {

    }
}