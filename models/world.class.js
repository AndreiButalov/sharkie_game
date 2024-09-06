class World {

    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    endBoss;

    character = new Character();
    bubbleFish = new GreenBubbleFish();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    coin = new Coin();
    poisons = [new Poison()];
    // barrier = new Barrier();
    barrierDown = new BarrierDown();
    barrierDownUp = new BarrierDownUp();
    objectsCollection = new ObjectCollection();


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
            this.poisons.push(poison);
        }
    }


    checkCollisions() {
        this.checkCollisionsEmemies();
        this.checkCollisionsBoss();
        this.checkCollisionsObject();
    }


    checkCollisionsEmemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding();
            }
        })
    }


////////////////////
    checkCollisionsObject() {
        const objects = this.objectsCollection;
        if (this.character.isColliding(objects)) {
            this.checkIsColliding();
        }
    }
///////////////////

    checkCollisionsBoss() {
        if (this.endBoss) {
            const enemy = this.endBoss;
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding();
            }
        }
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

        this.addToMap(this.barrierDown);
        this.addToMap(this.barrierDownUp);


        if (this.endBoss) {
            this.addToMap(this.endBoss);
        }

        
        this.addObjectsToMap(this.poisons);

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
        parameter.drawFrame(this.ctx);
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