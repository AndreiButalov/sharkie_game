class Character extends MovableObject {

    world;
    speed = 5;
    height = 200;
    width = 200;

    isAttacking = false;
    attackStartTime = 0;

    offset = {
        top: 120,
        left: 50,
        bottom: 40,
        right: 40
    }


    SHARKIE_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ]


    SHARKIE_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
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


    SHARKIE_HURT = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ]


    SHARKIE_POISONED = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
        
    ]


    IMAGES_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ]


    IMAGES_ATTACK = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ]


    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.SHARKIE_SWIM);
        this.loadImages(this.SHARKIE_STAND);
        this.loadImages(this.SHARKIE_DEAD);
        this.loadImages(this.SHARKIE_HURT);
        this.loadImages(this.IMAGES_BUBBLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.animateCharacter();
    }


    animateCharacterSwim() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && this.y > -40) {
                this.moveUp();
            }

            if (this.world.keyboard.DOWN && this.y < 300) {
                this.moveDown();
            }

            if (this.world.keyboard.D) {
                this.sharkieAttack();
            }

            this.world.camera_x = -this.x + 50;
        }, 1000 / 30);
    }


    animateCharacter() {
        this.animateCharacterSwim();

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.SHARKIE_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.SHARKIE_HURT);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.SHARKIE_SWIM);
            } else {
                this.playAnimation(this.SHARKIE_STAND);
            }
        }, 150)

    }


    blowBubble() {
        let i = 0;
        const interval = setInterval(() => {
            if (i < this.IMAGES_BUBBLE.length) {
                this.img = this.imageCache[this.IMAGES_BUBBLE[i]];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 40);
    }


    sharkieAttack() {
       
        if (this.isAttacking) return; 

        this.isAttacking = true; 
        this.attackStartTime = Date.now(); 
        this.moving = false; 
        this.playAnimation(this.IMAGES_ATTACK); 

        const frameDuration = 100; 
        const totalDuration = frameDuration * this.IMAGES_ATTACK.length;

        const animate = () => {
            const elapsed = Date.now() - this.attackStartTime; 

            if (elapsed >= totalDuration) {
                this.playAnimation(this.SHARKIE_STAND);
                this.moving = true; 
                this.isAttacking = false; 
                return; 
            }

            const frameIndex = Math.floor(elapsed / frameDuration); 
            this.img = this.imageCache[this.IMAGES_ATTACK[frameIndex]];

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate); 
    }

}