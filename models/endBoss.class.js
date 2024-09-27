class EndBoss extends MovableObject {

    height = 400;
    width = 400;
    y = 0;
    // x = 3700;
    x = 700;

    frequency = 0.09;
    amplitudeX = 11;
    amplitudeY = 4;


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
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
        'img/2.Enemy/3 Final Enemy/Hurt/5.png',
        'img/2.Enemy/3 Final Enemy/Hurt/6.png',
    ];


    constructor() {
        super().loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.loadImages(this.BOSS_SWIM);
        this.loadImages(this.BOSS_INTRODUCE);
        this.loadImages(this.BOSS_ATTACK);
        this.startBossAnimation();
    }


    startBossAnimation() {
        this.bossArrivalAnimate();

        setTimeout(() => {
            clearInterval(this.arrivalInterval);
            this.bossSwimAnimate();
        }, 2000);
    }


    bossAttack() {
        let time = 0;
        setInterval(() => {
            this.x = this.x - Math.sin(time) * this.amplitudeX;
            this.y = this.y + Math.sin(time) * this.amplitudeY;
            time += this.frequency;
        }, 1000 / 25);
    }


    bossAttackMinus() {
        let time = 0;
        setInterval(() => {
            this.x = this.x - Math.sin(time) * this.amplitudeX;
            this.y = this.y - Math.sin(time) * this.amplitudeY;
            time += this.frequency;
        }, 1000 / 25);
    }


    bossArrivalAnimate() {
        this.arrivalInterval = setInterval(() => {
            this.playAnimation(this.BOSS_INTRODUCE);
        }, 200);
    }


    bossSwimAnimate() {
        this.startSwimmingAnimation();
    
        setTimeout(() => {
            this.startAttackAnimation();
        }, 3000);
    
        setTimeout(() => {
            this.resetToSwimming();
        }, 8200);
    
        setTimeout(() => {
            this.startSecondAttackAnimation();
        }, 12000);
    }

    
    startSwimmingAnimation() {
        this.swimInterval = setInterval(() => {
            this.playAnimation(this.BOSS_SWIM);
        }, 200);
    }

    
    startAttackAnimation() {
        clearInterval(this.swimInterval);
        this.bossAttack();
        this.attackInterval = setInterval(() => {
            this.playAnimation(this.BOSS_ATTACK);
        }, 200);
    }
    

    resetToSwimming() {
        clearInterval(this.attackInterval);
        this.y = 0;            
        this.amplitudeX = 0;            
        this.amplitudeY = 0;            
        this.startSwimmingAnimation();
    }

    
    startSecondAttackAnimation() {
        clearInterval(this.swimInterval);
        this.amplitudeX = 11;
        this.amplitudeY = 4;
        this.bossAttackMinus();
        this.attackInterval = setInterval(() => {
            this.playAnimation(this.BOSS_ATTACK);
        }, 200);
    }


    playEndBossIsDead() {
        console.log('boss ist dead');

    }

}