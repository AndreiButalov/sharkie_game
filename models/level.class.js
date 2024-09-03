class Level {

    enemies;
    backgroundObjects;
    coin;
    endBoss;
    poison;
    level_end_x = 3600; // muss man ändern

    constructor(enemies, backgroundObjects, endBoss, coin, poison) {
        this.enemies =  enemies;
        this.backgroundObjects = backgroundObjects;
        this.endBoss = endBoss;
        this.coin = coin;
        this.poison = poison;
    }
}