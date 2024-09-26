class World {

    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    endBoss;
    poisonCount = 0;
    coinCount = 0;

    character = new Character();
    // greenBubbleFish = new GreenBubbleFish();
    // jellyFish = new JellyFish();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    coin = new Coin();
    throwPoisons = [new PoisonAttack()];
    throwBubble = [new BubbleAttack()];
    // barrier = new Barrier();
    barrierDown = new BarrierDown();
    barrierDownUp = new BarrierDownUp();
    objectsCollection = new ObjectCollection();
    poisonCollect = new PoisonCollect();



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
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.poisonButtle);
        this.addToMap(this.character);

        // this.addToMap(this.barrierDown);
        // this.addToMap(this.barrierDownUp);


        if (this.endBoss) {
            this.addToMap(this.endBoss);
        }


        this.addObjectsToMap(this.throwPoisons);
        this.addObjectsToMap(this.throwBubble);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

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
                bossSpawned = true;
                clearInterval(spawnBoss);
            }
        }, 200);
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.trowPoison();
        }, 200);
    }


    checkCollisions() {
        this.checkCollisionsEmemies();
        this.checkCollisionsBoss();
        this.checkCollisionsBottle();
        this.checkCollisionsCoin();
        this.checkCollisionsBubblefishBubble();
        this.checkCollisionsBossPoisonBubble();
        this.checkCollisionsJellyfishBubble();
    }


    checkIsColliding() {
        this.character.hitCharacter();
        this.statusBar.setPercentage(this.character.energy);
    }


    checkCollisionsEmemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding();
            }
        })
    }


    checkCollisionsBottle() {
        this.poisonBar.setPercentage(this.poisonCount);
        this.level.poisonButtle.forEach((bottle) => {
            if (this.character.isCollidingPoison(bottle)) {
                this.addPoison(bottle);
            }
        })
    }


    checkCollisionsCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isCollidingPoison(coin)) {
                this.addCoin();
                this.coinBar.setPercentage(this.coinCount);
            }
        });
    }


    checkCollisionsBoss() {
        if (this.endBoss) {
            const enemy = this.endBoss;
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding();
            }
        }
    }


    checkCollisionsBubblefishBubble() {
        this.level.enemies.forEach((enemy) => {
            this.throwPoisons.forEach((trowPoison) => {
                if (trowPoison.isCollidingBubble(enemy)) {
                    this.downBubblePoison(trowPoison);
                    enemy.hitEnemies();
                    this.checkHitEnemiesPoisonAttack(enemy);
                }
            });
            if (enemy instanceof GreenBubbleFish || enemy instanceof RedBubbleFish) {
                this.throwBubble.forEach((bubble) => {
                    if (bubble.isCollidingBubble(enemy)) {
                        this.downBubble(bubble);
                        enemy.hitEnemies();
                        this.checkHitEnemiesBubbleAttack(enemy);
                    }
                });
            }
        });
    }


    checkCollisionsJellyfishBubble() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof JellyFish) {
                this.throwBubble.forEach((bubble) => {
                    if (bubble.isCollidingBubble(enemy)) {
                        this.downBubble(bubble);
                        enemy.jellyFishDead();
                        this.jellyFishDisable(enemy);
                    }
                });
            }
        });
    }


    checkCollisionsBossPoisonBubble() {
        if (this.endBoss) {
            const enemy = this.endBoss;
            this.throwPoisons.forEach((trowPoison) => {
                if (trowPoison.isCollidingBubble(enemy)) {
                    this.downBubblePoison(trowPoison);
                }
            })
        }
    }


    checkHitEnemiesPoisonAttack(enemy) {
        enemy.energyEnemie -= 100;
        if (enemy.energyEnemie <= 0) {
            this.jellyFishDisable(enemy);
        }
    }



    checkHitEnemiesBubbleAttack(enemy) {
        if (enemy instanceof GreenBubbleFish) {
            enemy.energyEnemie -= 50;
        } else {
            enemy.energyEnemie -= 100 / 3;
        }

        if (enemy.energyEnemie <= 0) {
            this.jellyFishDisable(enemy);
        }
    }


    bubbleFishTransition() {
        setInterval(() => {
            this.level.enemies.forEach((fish) => {
                if (this.isGreenBubbleFish(fish) || this.isRedBubbleFish(fish)) {
                    fish.triggerTransition();
                }
            });
        }, 200);
    }


    isGreenBubbleFish(fish) {
        return fish.x - this.character.x < 550 && fish instanceof GreenBubbleFish;
    }


    isRedBubbleFish(fish) {
        return fish.x - this.character.x < 450 && fish instanceof RedBubbleFish;
    }


    jellyFishDisable(enemy) {
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


    trowPoison() {
        if (this.keyboard.SPACE) {
            if (this.poisonCount > 0) {
                this.character.blowBubble(this.character.IMAGES_BUBBLE_POISON);
                let poison = new PoisonAttack(this.character.x + 100, this.character.y);
                this.throwPoisons.push(poison);
                this.poisonCount--;
            } else {
                this.character.blowBubble(this.character.IMAGES_BUBBLE);
                let bubble = new BubbleAttack(this.character.x + 100, this.character.y);
                this.throwBubble.push(bubble);
            }
        }
    }


    addPoison(buttle) {
        if (this.poisonCount <= 4) {
            this.level.poisonButtle = this.level.poisonButtle.filter((item) => item !== buttle);
            this.poisonCount++;
        }
    }


    addCoin() {
        if (this.coinCount <= 4) {
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
        // parameter.drawFrame(this.ctx);
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
}