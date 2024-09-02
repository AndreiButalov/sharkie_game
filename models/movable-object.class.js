class MovableObject extends DrawableObject {

    speed = 0.2;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    camera_xx = 0;

    // applySwim
    frequency = 0;
    amplitude = 0;

    speedY = 0;
    accleraration = 1;


    // applyGravity() {
    //     setInterval(() => {
    //         this.y -= this.speedY;
    //         this.speedY -= this.accleraration;
    //     }, 1000 / 25);
    // }



    offset = {
        top: 0,
        left: 0,
        ridht: 0,
        bottom: 0
    }

    // isColliding(obj) {
    //     return (this.x + 30) + (this.width - 70) > obj.x &&     //R  L
    //         (this.y + 95) + (this.height - 140) > obj.y &&      //T  B
    //         this.x + 30 < obj.x &&                              //L  R
    //         this.y + 95 < (obj.y - 30) + obj.height             //B  T
    // }


    isColliding(obj) {
        return (this.x + 30) + (this.width - 70) > obj.x &&     //R  L
            (this.y + 95) + (this.height - 140) > obj.y &&      //T  B
            this.x + 30 < obj.x &&                              //L  R
            this.y + 95 < (obj.y - this.offset.bottom) + obj.height             //B  T
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