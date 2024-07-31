class MovableObject extends DrawableObject {
    
    speed = 0.2;
    otherDirection = false;
    energy = 100;
    lastHit = 0;


    isColliding(obj) {
        return (this.x + 40) + (this.width - 80) > obj.x &&
            (this.y + 95) + (this.height -140) > obj.y &&
            this.x + 40 < obj.x &&
            this.y + 95 < (obj.y - 50) + obj.height
    }


    // isCollidingEnemys(obj) {
    //     return this.x + this.width > obj.x &&
    //         this.y + this.height > obj.y &&
    //         this.x < obj.x &&
    //         this.y < obj.y + obj.height
    // }

    // ctx.rect(this.x +40, this.y+95, this.width -80, this.height -140);

    // isColliding(obj) {
    //     return this.x + this.width > obj.x &&
    //         this.y + this.height > obj.y &&
    //         this.x < obj.x &&
    //         this.y < obj.y + obj.height
    // }


    hit() {
        this.energy -= 5;
        if (this.energy < 0 ) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }
    

    moveLeft() {
        this.x -= this.speed;

    }


    moveUp() {
        this.y -= this.speed;
    }


    moveDown() {
        this.y += this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}