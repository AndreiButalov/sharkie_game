class World {

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    endBoss;
    statusBarBoss;
    poisonCount = 5;
    coinCount = 0;
    finalBackground;
    youWin = false;
    isGameOver = false;
    isGamePause = false;
    isMuted = false;
    isLeft = false;

    bubble = new BubbleAttack();
    poison = new PoisonAttack();
    character = new Character();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    coin = new Coin();
    throwPoisons = [new PoisonAttack()];
    throwBubble = [new BubbleAttack()];
    objectsCollection = new ObjectCollection();
    poisonCollect = new PoisonCollect();
    sound = new Sound();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.endBossArrival();
        this.bubbleFishTransition();
        this.setWorld();
        this.run();
    }


    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Draws all elements of the game on the canvas. This includes clearing the canvas,
     * drawing background objects, characters, enemies, miscellaneous objects, status bars,
     * and requesting the next frame for animation.
     */
    draw() {
        this.clearCanvas();
        this.drawBackgroundObjects();
        this.drawCharacterAndEnemies();
        this.drawMiscellaneousObjects();
        this.drawStatusBars();
        this.resetCameraTranslation();
        this.drawFinalBackgroundIfNeeded();
        this.requestNextFrame();
    }


    /**
     * Clears the canvas and applies the camera translation.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Resets the camera translation after drawing the elements.
     */
    resetCameraTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }
    

    /**
     * Draws all background objects on the canvas by adding them to the map.
     */
    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }


    /**
     * Draws the character and all enemies on the canvas by adding them to the map.
     */
    drawCharacterAndEnemies() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }


    /**
     * Draws miscellaneous objects on the canvas. These objects include coins, poison bottles, thrown poisons, bubbles, barriers, and the end boss (if available).
     * Certain objects are only drawn if the game is not paused.
     */
    drawMiscellaneousObjects() {
        if (!this.isGamePause) {
            this.addObjectsToMap(this.level.coin);
            this.addObjectsToMap(this.level.poisonButtle);
        }
        this.addObjectsToMap(this.throwPoisons);
        this.addObjectsToMap(this.throwBubble);
        this.addObjectsToMap(this.level.barriers);
        if (this.endBoss) {
            this.addToMap(this.endBoss);
        }
    }


    /**
     * Draws status bars (character status, boss status, coin, and poison bars) by adding them to the map.
     * Also resets and applies camera translation for status bars.
     */
    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        if (this.statusBarBoss) {
            this.addToMap(this.statusBarBoss);
        }
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Draws the final background if needed by adding it to the map.
     */
    drawFinalBackgroundIfNeeded() {
        if (this.finalBackground) {
            this.addToMap(this.finalBackground);
        }
    }


    /**
     * Requests the next animation frame for continuous rendering of the game. 
     * Uses requestAnimationFrame to call the draw method recursively.
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Triggers the arrival of the end boss when the character reaches a specific position (3200).
     * Spawns the end boss, plays sound, and sets up a check to monitor the end of the level.
     */
    endBossArrival() {
        let bossSpawned = false;
        const spawnBoss = setInterval(() => {
            if (this.character.x >= 3200 && !bossSpawned) {
                this.endBoss = new EndBoss();
                this.statusBarBoss = new StatusBarBoss();
                bossSpawned = true;
                this.sound.finalSound();
                clearInterval(spawnBoss);
                this.checkEnd = setInterval(() => {
                    this.checkEndLevel();
                }, 200);
            }
        }, 200);
    }


    /**
     * Runs the game loop to check for collisions, throw poison, and play level sounds every 200ms.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.character.trowPoison();
            this.levelSoundPlay();
            console.log(this.poisonCount);
            
        }, 200);
    }


    /**
     * 
     * Plays the level background music if the game is not paused, the boss has not appeared, the game is not over, and sound is not muted.
     */
    levelSoundPlay() {
        if (!this.isGamePause && !this.endBoss && !this.isGameOver && !this.isMuted) {
            this.sound.levelSound.play();
            this.sound.adventureTheme.play();
        }
    }


    /**
     * Checks if the level has ended by verifying if the end boss is defeated.
     * If the boss is defeated, triggers the final background, stops all sounds, and plays the victory sound.
     * Sets the `youWin` flag to true and stops checking for level end.
     */
    checkEndLevel() {
        if (this.endBoss.endLevel) {
            this.finalBackground = new FinalBackground();
            this.sound.stopAllSoundsEndLevel();
            if (!this.isMuted) {
                this.sound.yourWin.play();
            }
            clearInterval(this.checkEnd);
            this.youWin = true;
        }
    }


    /**
     * Checks for all types of collisions between the character and enemies, bosses, bottles, coins, and attacks.
     * Handles collision detection for various game objects.
     */
    checkCollisions() {
        this.character.checkCollisionsEmemies();
        this.character.checkCollisionsBoss();
        this.poisonCollect.checkCollisionsBottle();
        this.coin.checkCollisionsCoin();
        this.checkCollisionsBubblefishBubble();
        this.checkCollisionsBossAttack();
        this.checkCollisionsJellyfishBubble();
    }


    /**
     * Checks for collisions between the character and bubblefish bubbles.
     * Handles collision detection for both poisons and bubbles against bubblefish enemies.
     */
    checkCollisionsBubblefishBubble() {
        this.level.enemies.forEach((enemy) => {
            this.poison.checkPoisonCollisions(enemy);
            this.bubble.checkBubbleCollisions(enemy);
        });
    }


    /**
     * Checks for collisions between bubbles and jellyfish enemies.
     * Plays sound and removes the enemy if defeated by the bubble attack.
     */
    checkCollisionsJellyfishBubble() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof JellyFish) {
                this.throwBubble.forEach((bubble) => {
                    if (bubble.isCollidingBubble(enemy)) {
                        if (!this.isMuted) {
                            this.sound.bubbleHighSound.play();
                        }
                        this.bubble.downBubble(bubble);
                        enemy.jellyFishDead();
                        this.enemyDisable(enemy);
                    }
                });
            }
        });
    }


    /**
     * Checks for the boss being attacked by poison or bubble and processes the attack.
     * If the boss is hit, it reduces the boss's health and plays appropriate sounds.
     */
    checkCollisionsBossAttack() {
        if (this.endBoss) {
            const enemy = this.endBoss;
            this.poison.checkBossPoisonAttack(enemy);
            this.bubble.checkBossBubbleAttack(enemy);
        }
    }


    /**
     * Handles enemy hit by poison attack, reducing their health.
     * Plays sound and disables the enemy if their health reaches zero.
     * 
     * @param {Object} enemy - The enemy that was hit.
     */
    checkHitEnemiesPoisonAttack(enemy) {
        enemy.energyEnemie -= 100;
        if (!this.isMuted) {
            this.sound.bubbleLowSound.play();
        }
        if (enemy instanceof GreenBubbleFish || enemy instanceof RedBubbleFish) {
            if (enemy.energyEnemie <= 0) {
                enemy.playBubbleFishDead();
                this.enemyDisable(enemy);
            }
        }
    }


    /**
     * Handles enemy hit by bubble attack, reducing their health.
     * Plays sound and disables the enemy if their health reaches zero.
     * 
     * @param {Object} enemy - The enemy that was hit.
     */
    checkHitEnemiesBubbleAttack(enemy) {
        if (enemy instanceof GreenBubbleFish) {
            enemy.energyEnemie -= 100;
            if (!this.isMuted) {
                this.sound.bubbleHighSound.play();
            }
        } else {
            enemy.energyEnemie -= 50;
            if (!this.isMuted) {
                this.sound.bubbleHighSound.play();
            }
        }
        if (enemy.energyEnemie <= 0) {
            enemy.playBubbleFishDead();
            this.enemyDisable(enemy);
        }
    }


    /**
     * Handles the transition state of bubblefish enemies.
     * Runs at an interval of 200ms and triggers the transition for green and red bubblefish if they are alive.
     */
    bubbleFishTransition() {
        setInterval(() => {
            this.level.enemies.forEach((fish) => {
                if ((this.isGreenBubbleFish(fish) || this.isRedBubbleFish(fish)) && fish.isDead == false) {
                    fish.triggerTransition();
                }
            });
        }, 200);
    }


    /**
     * Adds multiple objects to the map by calling `addToMap` for each object.
     * 
     * @param {Array} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Draws the object on the canvas. If the object has the `otherDirection` flag, it flips the image.
     * 
     * @param {Object} parameter - The object to be drawn.
     */
    addToMap(parameter) {
        if (parameter.otherDirection) {
            this.flipImage(parameter);
        }

        parameter.draw(this.ctx);
        if (parameter.otherDirection) {
            this.flipImageBack(parameter);
        }
    }


    /**
     * Flips the image of a given parameter horizontally before drawing it on the canvas.
     * Saves the current context, translates and scales the image.
     * 
     * @param {Object} parameter - The object whose image will be flipped.
     */
    flipImage(parameter) {
        this.ctx.save();
        this.ctx.translate(parameter.width, 0);
        this.ctx.scale(-1, 1);
        parameter.x = parameter.x * -1;
    }


    /**
     * Restores the image to its original orientation after drawing.
     * Reverses the x position and restores the canvas context.
     * 
     * @param {Object} parameter - The object whose image will be restored.
     */
    flipImageBack(parameter) {
        parameter.x = parameter.x * -1;
        this.ctx.restore();
    }


    /**
     * Checks if the given enemy is a GreenBubbleFish and is within 550 units of the character's position.
     * 
     * @param {Object} fish - The fish enemy to check.
     * @returns {boolean} - Returns true if the enemy is a GreenBubbleFish and within range.
     */
    isGreenBubbleFish(fish) {
        return fish.x - this.character.x < 550 && fish instanceof GreenBubbleFish;
    }


    /**
     * Checks if the given enemy is a RedBubbleFish and is within 450 units of the character's position.
     * 
     * @param {Object} fish - The fish enemy to check.
     * @returns {boolean} - Returns true if the enemy is a RedBubbleFish and within range.
     */
    isRedBubbleFish(fish) {
        return fish.x - this.character.x < 450 && fish instanceof RedBubbleFish;
    }


    /**
     * Disables an enemy by removing it from the game's level after a 1000ms delay.
     * The enemy is removed from the `level.enemies` array.
     * 
     * @param {Object} enemy - The enemy to disable and remove.
     */
    enemyDisable(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter((item) => item !== enemy);
        }, 1000);
    }

}