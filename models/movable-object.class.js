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


    /**
     * Checks if the current object is colliding with another object.
     * 
     * @param {Object} obj - The object to check for collision against.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(obj) {
        return this.x - this.offset.right + this.width > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x - this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }


    /**
     * Checks for collision between the current object and a poison object.
     * 
     * @param {Object} obj - The poison object to check for collision against.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isCollidingPoison(obj) {
        return this.x - this.offset.right + this.width > obj.x &&
            this.y + this.height - this.offset.bottom > obj.y &&
            this.x - this.offset.left < obj.x &&
            this.y + this.offset.top < obj.y + obj.height;
    }


    /**
     * Checks for collision between the current object and a bubble object.
     * 
     * @param {Object} obj - The bubble object to check for collision against.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isCollidingBubble(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y  &&
            this.x < obj.x + 100 &&
            this.y < obj.y + obj.height;
    }


    /**
     * Checks for collision between the current object and a bubble object specific to boss fish.
     * 
     * @param {Object} obj - The boss fish bubble object to check for collision against.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isCollidingBubbleBossFish(obj) {
        return this.x + this.width > obj.x + obj.offset.left &&
            this.y + this.height > obj.y + obj.offset.top &&
            this.x < obj.x + obj.width - obj.offset.right +100 &&
            this.y < obj.y + obj.height - obj.offset.bottom;
    }


    /**
     * Reduces the energy of the character by 5 when hit.
     * If energy goes below 0, it is set to 0. 
     * Updates the last hit time to the current time.
     */
    hitCharacter() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Updates the energy of the enemy when hit.
     * If energy goes below 0, it is set to 0.
     * Updates the last hit time to the current time.
     */
    hitEnemies() {
        if (this.energyEnemie < 0) {
            this.energyEnemie = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the character is dead based on energy.
     * 
     * @returns {boolean} True if the character's energy is 0, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }


    /**
     * Checks if the character is hurt based on the time since the last hit.
     * 
     * @returns {boolean} True if the character was hit in the last 0.5 seconds, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    /**
     * Checks if the character is affected by poison based on the time since the last hit.
     * 
     * @returns {boolean} True if the character was hit by poison in the last 0.5 seconds, false otherwise.
     */
    isPoison() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    /**
     * Applies a swimming animation effect to the character by changing its y-coordinate 
     * over time based on a sine wave.
     */
    applySwim() {
        let time = 0;
        setInterval(() => {
            this.y = this.initialY + Math.sin(time) * this.amplitude;
            time += this.frequency;
        }, 1000 / 25);
    }


    /**
     * Moves the character to the right by increasing its x-coordinate by the speed value.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    /**
     * Moves the character to the left by decreasing its x-coordinate by the speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Moves the character upwards by decreasing its y-coordinate by the speed value.
     */
    moveUp() {
        this.y -= this.speed;
    }


    /**
     * Moves the character downwards by increasing its y-coordinate by the speed value.
     */
    moveDown() {
        this.y += this.speed;
    }

    
    /**
     * Plays the next frame of the animation based on the images provided.
     * 
     * @param {Array<string>} images - An array of image paths for the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}