class BubbleAttack extends PoisonAttack {   

    IMAGES_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',
    ];


    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.loadImages(this.IMAGES_BUBBLE);        
        this.x = x;
        this.y = y;  
        this.trow(x, y);  
        this.poisonAnimate(this.IMAGES_BUBBLE); 
    } 
    

    /**
     * Checks for collisions between bubbles and bubblefish enemies (Green or Red).
     * If a collision is detected, the bubble collision handler is triggered.
     * 
     * @param {Object} enemy - The enemy to check collision against.
     */
    checkBubbleCollisions(enemy) {
        if (enemy instanceof GreenBubbleFish || enemy instanceof RedBubbleFish) {
            world.throwBubble.forEach((bubble) => {
                if (bubble.isCollidingBubble(enemy)) {
                    this.handleBubbleCollision(bubble, enemy);
                }
            });
        }
    }


    /**
     * Handles the collision between a bubble and an enemy.
     * Reduces the enemy's health and checks if the enemy is defeated by the bubble attack.
     * 
     * @param {Object} bubble - The bubble object that hit the enemy.
     * @param {Object} enemy - The enemy hit by the bubble.
     */
    handleBubbleCollision(bubble, enemy) {
        this.downBubble(bubble);
        enemy.hitEnemies();
        world.checkHitEnemiesBubbleAttack(enemy);
    }

    /**
     * Removes a thrown bubble object from the array of active bubbles.
     * 
     * @param {Object} bubble - The bubble object to be removed.
     */
    downBubble(bubble) {
        world.throwBubble = world.throwBubble.filter((item) => item !== bubble);
    }


    /**
     * Checks if the boss is hit by a thrown bubble.
     * Reduces the boss's health and updates the boss's status bar.
     * 
     * @param {Object} enemy - The boss to check for collisions.
     */
    checkBossBubbleAttack(enemy) {
        world.throwBubble.forEach((bubble) => {
            if (bubble.isCollidingBubbleBossFish(enemy)) {
                world.statusBarBoss.setPercentage(enemy.energyEnemie);
                enemy.energyEnemie -= 5;
                enemy.hitEnemies();
                if (!world.isMuted) {
                    world.sound.bossDamage.play();
                    world.sound.bubbleHighSound.play();
                }
                this.downBubble(bubble);
                if (enemy.energyEnemie <= 0) {
                    enemy.playEndBossIsDead();
                }
            }
        });
    }

}