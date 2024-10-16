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


    setWorld() {
        this.character.world = this;
    }


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


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
        this.ctx.translate(this.camera_x, 0);
    }


    resetCameraTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }


    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }


    drawCharacterAndEnemies() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }


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


    drawFinalBackgroundIfNeeded() {
        if (this.finalBackground) {
            this.addToMap(this.finalBackground);
        }
    }


    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    endBossArrival() {
        let bossSpawned = false;
        const spawnBoss = setInterval(() => {
            if (this.character.x >= 3200 && !bossSpawned) {
                this.endBoss = new EndBoss();
                this.statusBarBoss = new StatusBarBoss();
                bossSpawned = true;
                this.finalSound();
                clearInterval(spawnBoss);
                this.checkEnd = setInterval(() => {
                    this.checkEndLevel();
                }, 200);
            }
        }, 200);
    }


    finalSound() {
        if (!this.isMuted) {
            this.sound.adventureTheme.pause();
            this.sound.laughterBoss.play();
            this.sound.finalBossSound.play();
        }
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.trowPoison();
            this.levelSoundPlay();
        }, 200);
    }


    levelSoundPlay() {
        if (!this.isGamePause && !this.endBoss && !this.isGameOver && !this.isMuted) {
            this.sound.levelSound.play();
            this.sound.adventureTheme.play();
        }
    }


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


    checkCollisions() {
        this.checkCollisionsEmemies();
        this.checkCollisionsBoss();
        this.checkCollisionsBottle();
        this.checkCollisionsCoin();
        this.checkCollisionsBubblefishBubble();
        this.checkCollisionsBossAttack();
        this.checkCollisionsJellyfishBubble();
    }


    checkIsColliding() {
        this.character.hitCharacter();
        this.statusBar.setPercentage(this.character.energy);
    }


    checkCollisionsEmemies() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead) {
                if (this.character.isColliding(enemy)) {
                    this.checkIsColliding();
                }
            }
        })
    }


    checkCollisionsBottle() {
        this.poisonBar.setPercentage(this.poisonCount);
        this.level.poisonButtle.forEach((bottle) => {
            if (this.character.isCollidingPoison(bottle)) {
                this.addPoison(bottle);
                if (!this.isMuted) {
                    this.sound.drinkingPoison.play();
                }
            }
        })
    }


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


    checkCollisionsBoss() {
        if (this.endBoss && !this.endBoss.isDead) {
            const enemy = this.endBoss;
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding();
            }
        }
    }


    checkCollisionsBubblefishBubble() {
        this.level.enemies.forEach((enemy) => {
            this.checkPoisonCollisions(enemy);
            this.checkBubbleCollisions(enemy);
        });
    }


    checkPoisonCollisions(enemy) {
        this.throwPoisons.forEach((trowPoison) => {
            if (trowPoison.isCollidingBubbleBossFish(enemy)) {
                this.handlePoisonCollision(trowPoison, enemy);
            }
        });
    }


    checkBubbleCollisions(enemy) {
        if (enemy instanceof GreenBubbleFish || enemy instanceof RedBubbleFish) {
            this.throwBubble.forEach((bubble) => {
                if (bubble.isCollidingBubble(enemy)) {
                    this.handleBubbleCollision(bubble, enemy);
                }
            });
        }
    }


    handlePoisonCollision(trowPoison, enemy) {
        this.downBubblePoison(trowPoison);
        enemy.hitEnemies();
        this.checkHitEnemiesPoisonAttack(enemy);
    }


    handleBubbleCollision(bubble, enemy) {
        this.downBubble(bubble);
        enemy.hitEnemies();
        this.checkHitEnemiesBubbleAttack(enemy);
    }


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


    checkCollisionsBossAttack() {
        if (this.endBoss) {
            const enemy = this.endBoss;
            this.checkBossPoisonAttack(enemy);
            this.checkBossBubbleAttack(enemy);
        }
    }


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
        })
    }


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


    bubbleFishTransition() {
        setInterval(() => {
            this.level.enemies.forEach((fish) => {
                if ((this.isGreenBubbleFish(fish) || this.isRedBubbleFish(fish)) && fish.isDead == false) {
                    fish.triggerTransition();
                }
            });
        }, 200);
    }


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


    addPoison(buttle) {
        if (this.poisonCount <= 4) {
            this.level.poisonButtle = this.level.poisonButtle.filter((item) => item !== buttle);
            this.poisonCount++;
        }
    }


    addCoin() {
        if (this.coinCount <= 9) {
            this.coinCount++;
            this.level.coin = this.level.coin.filter((coin) => !this.character.isCollidingPoison(coin));
        }
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(parameter) {
        if (parameter.otherDirection) {
            this.flipImage(parameter);
        }

        parameter.draw(this.ctx);
        if (parameter.otherDirection) {
            this.flipImageBack(parameter,)
        }
    }


    flipImage(parameter) {
        this.ctx.save();
        this.ctx.translate(parameter.width, 0);
        this.ctx.scale(-1, 1);
        parameter.x = parameter.x * -1;
    }


    flipImageBack(parameter) {
        parameter.x = parameter.x * -1;
        this.ctx.restore();
    }


    isGreenBubbleFish(fish) {
        return fish.x - this.character.x < 550 && fish instanceof GreenBubbleFish;
    }


    isRedBubbleFish(fish) {
        return fish.x - this.character.x < 450 && fish instanceof RedBubbleFish;
    }


    enemyDisable(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter((item) => item !== enemy);
        }, 1000)
    }


    downBubblePoison(trowPoison) {
        this.throwPoisons = this.throwPoisons.filter((item) => item !== trowPoison);
    }


    downBubble(bubble) {
        this.throwBubble = this.throwBubble.filter((item) => item !== bubble);
    }

}