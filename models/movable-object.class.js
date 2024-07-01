class MovableObject {
    x = 40;
    y = 250;
    height = 170;
    width = 170;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}