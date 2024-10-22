class PoisonCollect extends ObjectCollection {
    width = 50;
    height = 60;
    amplitude = 4;

    offset = {
        top: -10,
        left: 0,
        ridht: -130,
        bottom: 0
    }

    OBJECTIMAGES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];


    constructor(x) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.OBJECTIMAGES)
        this.initialY = 350 + Math.random() * 50;
        this.y = this.initialY;
        this.x = x;
        this.objecktAnimate(this.OBJECTIMAGES);
    }


    /**
     * Checks for collisions between the character and poison bottles.
     * If a collision occurs, the character picks up the bottle, and the poison bar is updated.
     * Plays a drinking sound if the game is not muted.
     */
    checkCollisionsBottle() {
        world.poisonBar.setPercentage(world.poisonCount);
        world.level.poisonButtle.forEach((bottle) => {
            if (world.character.isCollidingPoison(bottle)) {
                this.addPoison(bottle);
                if (!world.isMuted) {
                    world.sound.drinkingPoison.play();
                }
            }
        });
    }

    
    /**
     * Adds poison to the character's inventory and removes the poison bottle from the level.
     * 
     * @param {Object} buttle - The poison bottle to be added.
     */
    addPoison(buttle) {
        if (world.poisonCount <= 4) {
            world.level.poisonButtle = world.level.poisonButtle.filter((item) => item !== buttle);
            world.poisonCount++;
        }
    }

}