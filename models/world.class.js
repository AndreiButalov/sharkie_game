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
    bubbleFish = new GreenBubbleFish();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    coin = new Coin();
    throwPoisons = [new PoisonAttack()];
    // barrier = new Barrier();
    barrierDown = new BarrierDown();
    barrierDownUp = new BarrierDownUp();
    objectsCollection = new ObjectCollection();
    poisonCollect = new PoisonCollect();
    redBubbleFish = new RedBubbleFish();
    jellyFish = new JellyFish();


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


    bubbleFishTransition() {
        setInterval(() => {
            this.level.enemies.forEach((fish) => {
                if ( this.isGreenBubbleFish(fish) || this.isRedBubbleFish(fish)) {
                    fish.triggerTransition();
                }                
            });
        }, 200);
    }


    isGreenBubbleFish(fish) {
        return fish.x - this.character.x < 550 && fish instanceof GreenBubbleFish;
    }


    isRedBubbleFish(fish) {
        return fish.x - this.character.x < 550 && fish instanceof RedBubbleFish;
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
        this.checkCollisionsBubble();
        this.checkCollisionsBossBubble();
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
        this.level.poisonButtle.forEach((buttle) => {
            if (this.character.isCollidingPoison(buttle)) {
                this.addPoison(buttle);
                this.poisonBar.setPercentage(this.poisonCount);
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


    checkCollisionsBubble() {
        this.level.enemies.forEach((enemy) => {
            this.throwPoisons.forEach((trowPoison) => {
                if (trowPoison.isCollidingBubble(enemy)) {
                    this.downBubble(trowPoison);
                }
            })
        })
    }


    checkCollisionsBossBubble() {
        if (this.endBoss) {
            const enemy = this.endBoss;
            this.throwPoisons.forEach((trowPoison) => {
                if (trowPoison.isCollidingBubble(enemy)) {
                    this.downBubble(trowPoison);
                }
            })
        }
    }


    downBubble(trowPoison) {
        this.throwPoisons = this.throwPoisons.filter((item) => item !== trowPoison);
    }


    trowPoison() {
        if (this.keyboard.SPACE) {
            this.character.blowBubble();
            setTimeout(() => {
                let poison = new PoisonAttack(this.character.x + 100, this.character.y);
                this.throwPoisons.push(poison);
            }, 400)
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
        this.addToMap(this.jellyFish);

        // this.addToMap(this.barrierDown);
        // this.addToMap(this.barrierDownUp);


        if (this.endBoss) {
            this.addToMap(this.endBoss);
        }


        this.addObjectsToMap(this.throwPoisons);

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