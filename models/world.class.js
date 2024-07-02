class World {
    character = new Character();

    enemies = [
        new Bubblefish(),
        new Bubblefish(),
        new Bubblefish()
    ];

    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0),
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

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
        this.ctx.drawImage(parameter.img, parameter.x, parameter.y, parameter.width, parameter.height);
    }
}