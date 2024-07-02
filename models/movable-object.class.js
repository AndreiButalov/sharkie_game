class MovableObject {
    x = 40;
    y = 230;
    height = 200;
    width = 200;
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