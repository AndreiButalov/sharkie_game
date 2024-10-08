class Level {

    enemies;
    backgroundObjects;
    coin;
    poisonButtle;
    barriers;
    level_end_x = 3600;
    // levelSound = new Audio('audio/underwater flow.mp3');

    constructor(enemies, backgroundObjects, coin, poisonButtle, barriers) {
        this.enemies =  enemies;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.poisonButtle = poisonButtle;
        this.barriers = barriers;
    }

    // levelSound.play();
}