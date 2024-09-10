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
    throwPoisons = [new Poison()];
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


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkPoison();
        }, 200);
    }


    checkPoison() {
        if (this.keyboard.SPACE) {
            let poison = new Poison(this.character.x, this.character.y);
            this.throwPoisons.push(poison);
        }
    }


    checkCollisions() {
        this.checkCollisionsEmemies();
        this.checkCollisionsBoss();
        this.checkCollisionsButtle();
        this.checkCollisionsCoin();
    }


    checkCollisionsEmemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding();
            }
        })
    }


    checkCollisionsButtle() {
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


    addPoison(buttle) {
        this.level.poisonButtle = this.level.poisonButtle.filter((item) => item !== buttle);
        this.poisonCount++;

    }


    addCoin() {
        this.coinCount++;
        this.level.coin = this.level.coin.filter((coin) => !this.character.isCollidingPoison(coin));
    }


    checkIsColliding() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
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