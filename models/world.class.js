class World {
    character = new Character();
    bubbleFish = new GreenBubbleFish();

    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            })
        }, 200);
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
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