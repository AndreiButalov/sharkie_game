class Level {

    enemies;
    backgroundObjects;
    coin;
    endBoss;
    poisonButtle;
    level_end_x = 3600; // muss man ändern

    constructor(enemies, backgroundObjects, endBoss, coin, poisonButtle) {
        this.enemies =  enemies;
        this.backgroundObjects = backgroundObjects;
        this.endBoss = endBoss;
        this.coin = coin;
        this.poisonButtle = poisonButtle;
    }
}