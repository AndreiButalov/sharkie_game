class World {

    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character = new Character();
    bubbleFish = new GreenBubbleFish();
    endBoss = new EndBoss();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    coin = new Coin();
    poisons = [new Poison()];
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.one();
    }


    one() {
        setInterval(() => {
            if (this.character.x > 150) {
                
            } 
            
        }, 200)       
    }


    run() {        
        setInterval(() => {
           this.checkCollisions();
           this.checkPoison();
        }, 200);


    }

    checkPoison() {
        if(this.keyboard.SPACE) {
            console.log(this.character.x);
            console.log(this.character.y);
            
            let poison = new Poison(this.character.x, this.character.y); 
            this.poisons.push(poison)
        }
    }

    checkCollisions() {
        const enemy = this.level.endBoss; 

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.checkIsColliding()
            }
        })
        
        if (this.character.isColliding(enemy)) {
            this.checkIsColliding()
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
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.coin);
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