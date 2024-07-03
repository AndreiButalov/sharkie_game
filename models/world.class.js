class World {
    character = new Character();

    enemies = [
        new Bubblefish(),
        new Bubblefish(),
        new Bubblefish()
    ];

    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720),
    ];

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