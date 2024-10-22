class World {

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    endBoss;
    statusBarBoss;
    poisonCount = 0;
    coinCount = 0;
    finalBackground;
    youWin = false;
    isGameOver = false;
    isGamePause = false;
    isMuted = false;

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
                this.finalSound();
                clearInterval(spawnBoss);

                // Check for level end every 200ms
                this.checkEnd = setInterval(() => {
                    this.checkEndLevel();
                }, 200);
            }
        }, 200);
    }


    /**
     * Plays final sound effects when the end boss spawns, including laughter and boss music.
     * Stops background sounds unless the game is muted.
     */
    finalSound() {
        if (!this.isMuted) {
            this.sound.adventureTheme.pause();
            this.sound.laughterBoss.play();
            this.sound.finalBossSound.play();
        }
    }


    /**
     * Runs the game loop to check for collisions, throw poison, and play level sounds every 200ms.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.trowPoison();
            this.levelSoundPlay();
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
            world.sound.stopAllSoundsEndLevel();
            if (!this.isMuted) {
                world.sound.yourWin.play();
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
        this.checkCollisionsEmemies();
        this.checkCollisionsBoss();
        this.checkCollisionsBottle();
        this.checkCollisionsCoin();
        this.checkCollisionsBubblefishBubble();
        this.checkCollisionsBossAttack();
        this.checkCollisionsJellyfishBubble();
    }


    /**
     * Handles what happens when the character collides with an enemy, boss, or other harmful entity.
     * Reduces the character's health and updates the status bar.
     */
    checkIsColliding() {
        this.character.hitCharacter();
        this.statusBar.setPercentage(this.character.energy);
    }


    /**
     * Checks for collisions between the character and regular enemies.
     * If a collision is detected and the enemy is not dead, it triggers the character's hit function.
     */
    checkCollisionsEmemies() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead) {
                if (this.character.isColliding(enemy)) {
                    this.checkIsColliding();
                }
            }
        });
    }


    /**
     * Checks for collisions between the character and poison bottles.
     * If a collision occurs, the character picks up the bottle, and the poison bar is updated.
     * Plays a drinking sound if the game is not muted.
     */
    checkCollisionsBottle() {
        this.poisonBar.setPercentage(this.poisonCount);
        this.level.poisonButtle.forEach((bottle) => {
            if (this.character.isCollidingPoison(bottle)) {
                this.addPoison(bottle);
                if (!this.isMuted) {
                    this.sound.drinkingPoison.play();
                }
            }
        });
    }


    /**
     * Checks for collisions between the character and coins.
     * If a coin is collected, the character's coin count increases, and the coin bar is updated.
     * Plays a coin collection sound if the game is not muted.
     */
    checkCollisionsCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isCollidingPoison(coin)) {
                this.addCoin();
                if (!this.isMuted) {
                    this.sound.coinSound.play();
                }
                this.coinBar.setPercentage(this.coinCount);
            }
        });
    }


    /**
     * Checks for collisions between the character and the end boss.
     * If a collision is detected and the boss is not dead, the character's hit function is triggered.
     */
    checkCollisionsBoss() {
        if (this.endBoss && !this.endBoss.isDead) {
            const enemy = this.endBoss;
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding();
            }
        }
    }


    /**
     * Checks for collisions between the character and bubblefish bubbles.
     * Handles collision detection for both poisons and bubbles against bubblefish enemies.
     */
    checkCollisionsBubblefishBubble() {
        this.level.enemies.forEach((enemy) => {
            this.checkPoisonCollisions(enemy);
            this.checkBubbleCollisions(enemy);
        });
    }


    /**
     * Checks for collisions between thrown poisons and enemies.
     * If a collision is detected, the poison collision handler is triggered.
     * 
     * @param {Object} enemy - The enemy to check collision against.
     */
    checkPoisonCollisions(enemy) {
        this.throwPoisons.forEach((trowPoison) => {
            if (trowPoison.isCollidingBubbleBossFish(enemy)) {
                this.handlePoisonCollision(trowPoison, enemy);
            }
        });
    }


    /**
     * Checks for collisions between bubbles and bubblefish enemies (Green or Red).
     * If a collision is detected, the bubble collision handler is triggered.
     * 
     * @param {Object} enemy - The enemy to check collision against.
     */
    checkBubbleCollisions(enemy) {
        if (enemy instanceof GreenBubbleFish || enemy instanceof RedBubbleFish) {
            this.throwBubble.forEach((bubble) => {
                if (bubble.isCollidingBubble(enemy)) {
                    this.handleBubbleCollision(bubble, enemy);
                }
            });
        }
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
        this.checkHitEnemiesPoisonAttack(enemy);
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
        this.checkHitEnemiesBubbleAttack(enemy);
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
                        this.downBubble(bubble);
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
            this.checkBossPoisonAttack(enemy);
            this.checkBossBubbleAttack(enemy);
        }
    }


    /**
     * Checks if the boss is hit by a thrown poison.
     * Reduces the boss's health and updates the boss's status bar.
     * 
     * @param {Object} enemy - The boss to check for collisions.
     */
    checkBossPoisonAttack(enemy) {
        this.throwPoisons.forEach((trowPoison) => {
            if (trowPoison.isCollidingBubbleBossFish(enemy)) {
                this.statusBarBoss.setPercentage(enemy.energyEnemie);
                enemy.energyEnemie -= 20;
                enemy.hitEnemies();
                if (!this.isMuted) {
                    this.sound.bossDamage.play();
                    this.sound.bubbleHighSound.play();
                }
                this.downBubblePoison(trowPoison);
                if (enemy.energyEnemie <= 0) {
                    enemy.playEndBossIsDead();
                }
            }
        });
    }


    /**
     * Checks if the boss is hit by a thrown bubble.
     * Reduces the boss's health and updates the boss's status bar.
     * 
     * @param {Object} enemy - The boss to check for collisions.
     */
    checkBossBubbleAttack(enemy) {
        this.throwBubble.forEach((bubble) => {
            if (bubble.isCollidingBubbleBossFish(enemy)) {
                this.statusBarBoss.setPercentage(enemy.energyEnemie);
                enemy.energyEnemie -= 5;
                enemy.hitEnemies();
                if (!this.isMuted) {
                    this.sound.bossDamage.play();
                    this.sound.bubbleHighSound.play();
                }
                this.downBubble(bubble);
                if (enemy.energyEnemie <= 0) {
                    enemy.playEndBossIsDead();
                }
            }
        });
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
     * Throws either poison or bubble attacks when the spacebar is pressed, if the game is not paused.
     * Plays appropriate sound effects based on the action.
     */
    trowPoison() {
        if (!this.isGamePause) {
            if (this.keyboard.SPACE) {
                if (!this.isMuted) {
                    this.sound.blowingBubble.play();
                }
                if (this.poisonCount > 0) {
                    this.trowPoisonAttack();
                } else {
                    this.trowBubbleAttack();
                }
            }
        }
    }


    /**
     * Throws a bubble attack and adds it to the array of thrown bubbles.
     * Automatically removes the bubble after 3800ms if the game is not paused.
     */
    trowBubbleAttack() {
        this.character.blowBubble(this.character.IMAGES_BUBBLE);
        let bubble = new BubbleAttack(this.character.x + 100, this.character.y);
        this.throwBubble.push(bubble);
        setTimeout(() => {
            if (!this.isGamePause) {
                this.downBubble(bubble);
            }
        }, 3800);
    }


    /**
     * Throws a poison attack and adds it to the array of thrown poisons.
     * Reduces the poison count and removes the poison after 4000ms if the game is not paused.
     */
    trowPoisonAttack() {
        this.character.blowBubble(this.character.IMAGES_BUBBLE_POISON);
        let poison = new PoisonAttack(this.character.x + 100, this.character.y);
        this.throwPoisons.push(poison);
        this.poisonCount--;
        setTimeout(() => {
            if (!this.isGamePause) {
                this.downBubblePoison(poison);
            }
        }, 4000);
    }


    /**
     * Adds poison to the character's inventory and removes the poison bottle from the level.
     * 
     * @param {Object} buttle - The poison bottle to be added.
     */
    addPoison(buttle) {
        if (this.poisonCount <= 4) {
            this.level.poisonButtle = this.level.poisonButtle.filter((item) => item !== buttle);
            this.poisonCount++;
        }
    }


    /**
     * Adds a coin to the character's inventory and removes it from the level.
     */
    addCoin() {
        if (this.coinCount <= 9) {
            this.coinCount++;
            this.level.coin = this.level.coin.filter((coin) => !this.character.isCollidingPoison(coin));
        }
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


    /**
     * Removes a thrown poison object from the array of active poisons.
     * 
     * @param {Object} trowPoison - The poison object to be removed.
     */
    downBubblePoison(trowPoison) {
        this.throwPoisons = this.throwPoisons.filter((item) => item !== trowPoison);
    }

    
    /**
     * Removes a thrown bubble object from the array of active bubbles.
     * 
     * @param {Object} bubble - The bubble object to be removed.
     */
    downBubble(bubble) {
        this.throwBubble = this.throwBubble.filter((item) => item !== bubble);
    }

}