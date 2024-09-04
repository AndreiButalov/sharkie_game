class MovableObject extends DrawableObject {

    speed = 0.2;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    camera_xx = 0;

    frequency = 0;
    amplitude = 0;

    speedY = 0;
    accleraration = 2.5;

    offset = {
        top: 0,
        left: 0,
        ridht: 0,
        bottom: 0
    }
    
    applyGravity() {
        setInterval(() => {
                if ( this.speedY > 0) {
                    this.y += this.speedY;
                    this.speedY -= this.accleraration;
                }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 120;
    }


    isColliding(obj) {
        return this.x - this.offset.right + this.width > obj.x + obj.offset.left &&     //R  L
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&      //T  B
            this.x - this.offset.left < obj.x + obj.width - obj.offset.right &&                              //L  R
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom             //B  T
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
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


    applySwim() {
        let time = 0;
        setInterval(() => {
            this.y = this.initialY + Math.sin(time) * this.amplitude;
            time += this.frequency;
        }, 1000 / 25);
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