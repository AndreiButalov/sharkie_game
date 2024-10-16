class MovableObject extends DrawableObject {

    speed = 0.2;
    otherDirection = false;
    energy = 100;
    energyEnemie = 100;
    lastHit = 0;
    camera_xx = 0;

    frequency = 0;
    amplitude = 0;

    offset = {
        top: 0,
        left: 0,
        ridht: 0,
        bottom: 0
    }


    isColliding(obj) {
        return this.x - this.offset.right + this.width > obj.x + obj.offset.left &&  
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&   
            this.x - this.offset.left < obj.x + obj.width - obj.offset.right &&     
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom       
    }


    isCollidingPoison(obj) {
        return this.x - this.offset.right + this.width > obj.x &&
            this.y + this.height - this.offset.bottom > obj.y &&
            this.x - this.offset.left < obj.x &&
            this.y + this.offset.top < obj.y + obj.height
    }


    isCollidingBubble(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height
    }


    isCollidingBubbleBossFish(obj) {
        return this.x + this.width > obj.x + obj.offset.left &&
            this.y + this.height > obj.y + obj.offset.top &&
            this.x < obj.x + obj.width - obj.offset.right &&
            this.y < obj.y + obj.height - obj.offset.bottom
    }


    hitCharacter() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitEnemies() {
        if (this.energyEnemie < 0) {
            this.energyEnemie = 0;
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


    isPoison() {
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