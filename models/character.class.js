class Character extends MovableObject {

    world;
    speed = 5;
    height = 250;
    width = 250;

    isAttacking = false;
    attackStartTime = 0;

    offset = {
        top: 150,
        left: 55,
        bottom: 70,
        right: 65
    };


    SHARKIE_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];


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
    ];


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
    ];


    SHARKIE_HURT = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];


    SHARKIE_POISONED = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',

    ];


    IMAGES_BUBBLE_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];


    IMAGES_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];


    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.SHARKIE_SWIM);
        this.loadImages(this.SHARKIE_STAND);
        this.loadImages(this.SHARKIE_DEAD);
        this.loadImages(this.SHARKIE_HURT);
        this.loadImages(this.SHARKIE_POISONED);
        this.loadImages(this.IMAGES_BUBBLE_POISON);
        this.loadImages(this.IMAGES_BUBBLE);
        this.animateCharacter();
    }


    animateCharacterSwim() {
        setInterval(() => {
            if (this.isGameOverPause()) {
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
                if (this.world.keyboard.DOWN && this.y < 250) {
                    this.moveDown();
                }
                this.world.camera_x = -this.x + 50;
            }
        }, 1000 / 30);
    }


    isGameOverPause() {
        return !this.world.isGamePause && !this.world.isGameOver && !this.world.youWin;
    }


    animateCharacter() {
        this.animateCharacterSwim();
        this.animateCharacter = setInterval(() => {
            if (world.isGamePause) return;
            if (this.isDead()) {
                this.handleCharacterDeath();
            } else if (this.isHurt()) {
                this.handleCharacterHurt();
            } else if (this.isMoving()) {
                this.handleCharacterMovement();
            } else {
                this.handleCharacterIdle();
            }
        }, 100);
    }


    handleCharacterDeath() {
        this.world.sound.stopAllSoundsEndLevel();
        this.characterIsDead();
        if (!this.world.isMuted) {
            this.world.sound.fatality.play();
        }
        this.world.isGameOver = true;
    }


    handleCharacterHurt() {
        this.playAnimation(this.SHARKIE_HURT);
        if (!this.world.isMuted) {
            this.world.sound.electricShock.play();
            this.world.sound.waterSlapping.pause();
        }
    }


    handleCharacterMovement() {
        this.playAnimation(this.SHARKIE_SWIM);
        if (!this.world.isMuted) {
            this.world.sound.waterSlapping.play();
            this.world.sound.electricShock.pause();
        }
    }


    handleCharacterIdle() {
        this.playAnimation(this.SHARKIE_STAND);
        if (!this.world.isMuted) {
            this.world.sound.electricShock.pause();
            this.world.sound.waterSlapping.pause();
        }
    }


    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT ||
            this.world.keyboard.UP || this.world.keyboard.DOWN;
    }


    characterIsDead() {
        clearInterval(this.animateCharacter);
        this.characterDead = setInterval(() => {
            this.playAnimation(this.SHARKIE_DEAD);
        }, 200);

        setTimeout(() => {
            clearInterval(this.characterDead);
        }, 700);
    }


    blowBubble(arr) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < arr.length) {
                this.img = this.imageCache[arr[i]];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 40);
    }

}