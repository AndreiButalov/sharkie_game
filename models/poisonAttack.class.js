class PoisonAttack extends MovableObject {

    width = 50;
    height = 60;
    frequency = 0.09;
    amplitude = 2;
    world;


    IMAGES_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'
    ];


    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.loadImages(this.IMAGES_POISON);
        this.x = x;
        this.y = y;
        this.poisonAnimate(this.IMAGES_POISON);        
        this.bubbleSwim();
    }

    
    /**
     * Plays the animation frames for the poison effect.
     *
     * @param {Array<string>} image - An array of image paths for the poison animation frames.
     */
    poisonAnimate(image) {
        this.playAnimation(image);
    }


    /**
     * Animates the object's vertical movement to simulate a swimming effect.
     * The object moves up and down based on a sine wave, adjusted by a frequency and amplitude.
     */
    bubbleSwim() {
        let time = 0;
        setInterval(() => {
            if (!world.isGamePause) {
                this.y = this.y + Math.sin(time) * this.amplitude;
                time += this.frequency;
            }
        }, 1000 / 25);
    }

    
    /**
     * Throws an object to a specified position, incrementally moving it to the right.
     *
     * @param {number} x - The x-coordinate to which the object should be moved.
     * @param {number} y - The y-coordinate to which the object should be moved.
     */
    trow(x, y) {
        this.x = x + 120;
        this.y = y + 120;
        setInterval(() => {
            if (!world.isGamePause) {
                this.x += 3;
            }
        }, 50);
    }

    
    /**
     * Throws an object to a specified position, incrementally moving it to the right.
     *
     * @param {number} x - The x-coordinate to which the object should be moved.
     * @param {number} y - The y-coordinate to which the object should be moved.
     */
    trowLeft(x, y) {
        this.x = x + 120;
        this.y = y + 120;
        setInterval(() => {
            if (!world.isGamePause) {
                this.x -= 3;
            }
        }, 50);
    }


    /**
     * Checks for collisions between thrown poisons and enemies.
     * If a collision is detected, the poison collision handler is triggered.
     * 
     * @param {Object} enemy - The enemy to check collision against.
     */
    checkPoisonCollisions(enemy) {
        world.throwPoisons.forEach((trowPoison) => {
            if (trowPoison.isCollidingBubbleBossFish(enemy)) {
                this.handlePoisonCollision(trowPoison, enemy);
            }
        });
    }


    /**
     * Handles the collision between thrown poison and an enemy.
     * Reduces the enemy's health and checks if the enemy is defeated by the poison attack.
     * 
     * @param {Object} trowPoison - The poison object that hit the enemy.
     * @param {Object} enemy - The enemy hit by the poison.
     */
    handlePoisonCollision(trowPoison, enemy) {
        this.downBubblePoison(trowPoison);
        enemy.hitEnemies();
        world.checkHitEnemiesPoisonAttack(enemy);
    }


    /**
     * Removes a thrown poison object from the array of active poisons.
     * 
     * @param {Object} trowPoison - The poison object to be removed.
     */
    downBubblePoison(trowPoison) {
        world.throwPoisons = world.throwPoisons.filter((item) => item !== trowPoison);
    }


    /**
     * Checks if the boss is hit by a thrown poison.
     * Reduces the boss's health and updates the boss's status bar.
     * 
     * @param {Object} enemy - The boss to check for collisions.
     */
    checkBossPoisonAttack(enemy) {
        world.throwPoisons.forEach((trowPoison) => {
            if (trowPoison.isCollidingBubbleBossFish(enemy)) {
                world.statusBarBoss.setPercentage(enemy.energyEnemie);
                enemy.energyEnemie -= 20;
                enemy.hitEnemies();
                if (!world.isMuted) {
                    world.sound.bossDamage.play();
                    world.sound.bubbleHighSound.play();
                }
                this.downBubblePoison(trowPoison);
                if (enemy.energyEnemie <= 0) {
                    enemy.playEndBossIsDead();
                }
            }
        });
    }

}