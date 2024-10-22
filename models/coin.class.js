class Coin extends ObjectCollection {

    width = 40;
    height = 40;
    amplitude = 5;

    OBJECTIMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];


    constructor(x) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.OBJECTIMAGES);
        this.x = x
        this.initialY = 90 + Math.random() * 300;
        this.y = this.initialY;
        this.objecktAnimate(this.OBJECTIMAGES);
    }

    
    /**
    * Checks for collisions between the character and coins.
    * If a coin is collected, the character's coin count increases, and the coin bar is updated.
    * Plays a coin collection sound if the game is not muted.
    */
    checkCollisionsCoin() {
        world.level.coin.forEach((coin) => {
            if (world.character.isCollidingPoison(coin)) {
                this.addCoin();
                if (!world.isMuted) {
                    world.sound.coinSound.play();
                }
                world.coinBar.setPercentage(world.coinCount);
            }
        });
    }


    /**
     * Adds a coin to the character's inventory and removes it from the level.
     */
    addCoin() {
        if (world.coinCount <= 9) {
            world.coinCount++;
            world.level.coin = world.level.coin.filter((coin) => !world.character.isCollidingPoison(coin));
        }
    }
}