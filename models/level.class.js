class Level {

    enemies;
    backgroundObjects;
    coin;
    poisonButtle;
    level_end_x = 3600;

    constructor(enemies, backgroundObjects, coin, poisonButtle) {
        this.enemies =  enemies;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.poisonButtle = poisonButtle;
    }
}