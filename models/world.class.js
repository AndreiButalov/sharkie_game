class World {
    character = new Character();

    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    // light = new Light();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        // this.addToMap(this.light);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function() {
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
            this.ctx.save();
            this.ctx.translate(parameter.width , 0);
            this.ctx.scale(-1, 1);
            parameter.x = parameter.x * -1;
        }
        this.ctx.drawImage(parameter.img, parameter.x, parameter.y, parameter.width, parameter.height);
        
        if (parameter.otherDirection) {
            parameter.x = parameter.x * -1;
            this.ctx.restore();
        }
    }
}