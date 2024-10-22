class EndBoss extends MovableObject {

    height = 400;
    width = 400;
    y = 0;
    x = 3700;

    frequency = 0.09;
    amplitudeX = 11;
    amplitudeY = 4;
    isDead = false;
    endLevel = false;

    offset = {
        top: 220,
        left: 25,
        right: 140,
        bottom: 40
    }


    BOSS_SWIM = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];


    BOSS_INTRODUCE = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];


    BOSS_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];


    BOSS_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];


    BOSS_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];


    constructor() {
        super().loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.loadImages(this.BOSS_SWIM);
        this.loadImages(this.BOSS_INTRODUCE);
        this.loadImages(this.BOSS_ATTACK);
        this.loadImages(this.BOSS_DEAD);
        this.loadImages(this.BOSS_HURT);
        this.startBossAnimation();
    }


    /**
     * Starts the boss animation sequence, beginning with the arrival animation.
     * After 2 seconds, it clears the arrival animation interval and starts swimming animation.
     */
    startBossAnimation() {
        this.bossArrivalAnimate();
        setTimeout(() => {
            clearInterval(this.arrivalInterval);
            this.bossSwimAnimate();
        }, 2000);
    }


    /**
     * Animates the boss's arrival by playing the introduction animation
     * at regular intervals until the game is paused.
     */
    bossArrivalAnimate() {
        this.arrivalInterval = setInterval(() => {
            if (!world.isGamePause) {
                this.playAnimation(this.BOSS_INTRODUCE);
            }
        }, 200);
    }


    /**
     * Controls the boss's attack movement with sinusoidal motion.
     * The boss moves left and up/down based on sine functions,
     * as long as the game is not paused or over.
     */
    bossAttack() {
        let time = 0;
        setInterval(() => {
            if (!world.isGamePause && !world.isGameOver) {
                this.x = this.x - Math.sin(time) * this.amplitudeX;
                this.y = this.y + Math.sin(time) * this.amplitudeY;
                time += this.frequency;
            }
        }, 1000 / 25);
    }


    /**
     * Controls the boss's attack movement with downward motion.
     * The boss moves left and down based on sine functions,
     * as long as the game is not paused or over.
     */
    bossAttackMinus() {
        let time = 0;
        setInterval(() => {
            if (!world.isGamePause && !world.isGameOver) {
                this.x = this.x - Math.sin(time) * this.amplitudeX;
                this.y = this.y - Math.sin(time) * this.amplitudeY;
                time += this.frequency;
            }
        }, 1000 / 25);
    }
    

    /**
     * Starts the boss's swimming animation and triggers the final attack sequence.
     */
    bossSwimAnimate() {
        this.startSwimmingAnimation();
        this.bossFinalAttack();
    }


    /**
     * Initiates the boss's final attack sequence, consisting of multiple attacks.
     */
    bossFinalAttack() {
        this.firstAttack();
        this.secondAttack();
    }


    /**
     * Executes the first attack sequence, scheduling attack animations and 
     * swimming resets at specific intervals.
     */
    firstAttack() {
        setTimeout(() => {
            this.startAttackAnimation();
        }, 3000);

        setTimeout(() => {
            this.resetToSwimming();
        }, 8200);

        setTimeout(() => {
            this.startSecondAttackAnimation();
        }, 12000);

        setTimeout(() => {
            this.resetToSwimming();
        }, 17300);
    }


    /**
     * Executes the second attack sequence, scheduling attack animations and 
     * swimming resets at specific intervals.
     */
    secondAttack() {
        setTimeout(() => {
            this.startSecondAttackAnimation();
        }, 22000);

        setTimeout(() => {
            this.resetToSwimming();
        }, 27300);

        setTimeout(() => {
            this.startSecondAttackAnimation();
        }, 32000);

        setTimeout(() => {
            this.resetToSwimming();
        }, 37300);
    }


    /**
     * Starts the boss's swimming animation and manages its state
     * while the game is not paused or over.
     */
    startSwimmingAnimation() {
        this.swimInterval = setInterval(() => {
            if (!world.isGamePause && !world.isGameOver) {
                if (!this.isDead && !this.isHurt()) {
                    this.playAnimation(this.BOSS_SWIM);
                } else if (this.isHurt()) {
                    this.playAnimation(this.BOSS_HURT);
                } else {
                    this.isBossDead(this.swimInterval);
                }
            }
        }, 200);
    }


    /**
     * Starts the boss's attack animation and manages attack movements.
     * Plays the attack animation and sound effects as long as the boss is not dead
     * and the game is not over or paused.
     */
    startAttackAnimation() {
        if (!this.isDead && !world.isGameOver) {
            clearInterval(this.swimInterval);
            this.bossAttack();
            this.attackInterval = setInterval(() => {
                if (!world.isMuted && !world.isGameOver && !world.isGamePause) {
                    world.sound.bossAttackSound.play();
                }
                if (!world.isGamePause && !world.isGameOver) {
                    this.isGAmeOverPause();
                }
            }, 200);
        }
    }


    /**
     * Handles the boss's death state, stopping all animations and playing the death animation.
     * It also plays the death sound and triggers the end level flag after a delay.
     * 
     * @param {number} interval - The interval ID to clear for the attack animation.
     */
    isBossDead(interval) {
        clearInterval(interval);
        this.amplitudeX = 0;
        this.amplitudeY = 2;
        if (!world.isMuted) {
            world.sound.bossDeathSound.play();
        }
        this.bossDeadInterval = setInterval(() => {
            this.playAnimation(this.BOSS_DEAD);
        }, 200);

        setTimeout(() => {
            clearInterval(this.bossDeadInterval);
        }, 700);

        setTimeout(() => {
            this.endLevel = true;
        }, 1000);
    }


    /**
     * Resets the boss to the swimming state by clearing the attack interval,
     * resetting the vertical position, and the amplitude values.
     * It starts the swimming animation if the boss is not dead and the game is not over.
     */
    resetToSwimming() {
        if (!this.isDead && !world.isGameOver) {
            clearInterval(this.attackInterval);
            this.y = 0;
            this.amplitudeX = 0;
            this.amplitudeY = 0;
            this.startSwimmingAnimation();
        }
    }


    /**
     * Initiates the second attack animation for the boss. It clears the swimming
     * interval, sets new amplitude values for the attack motion, and starts the
     * boss's downward attack animation. The attack animation and sound are managed
     * as long as the boss is not dead and the game is not over or paused.
     */
    startSecondAttackAnimation() {
        if (!this.isDead && !world.isGameOver) {
            clearInterval(this.swimInterval);
            this.amplitudeX = 11;
            this.amplitudeY = 4;
            this.bossAttackMinus();
            this.attackInterval = setInterval(() => {
                if (!world.isMuted && !world.isGameOver && !world.isGamePause) {
                    world.sound.bossAttackSound.play();
                }
                if (!world.isGamePause && !world.isGameOver) {
                    this.isGAmeOverPause();
                }
            }, 200);
        }
    }


    isGAmeOverPause() {
        if (!this.isDead && !this.isHurt()) {
            this.playAnimation(this.BOSS_ATTACK);
        } else if (this.isHurt()) {
            this.playAnimation(this.BOSS_HURT);
        } else {
            this.isBossDead(this.attackInterval);
        }
    }

    
    /**
     * Marks the boss as dead, stopping all animations and setting its dead state.
     */
    playEndBossIsDead() {
        this.isDead = true;
    }

}