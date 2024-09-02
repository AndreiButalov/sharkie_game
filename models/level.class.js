class Level {
    enemies;
    backgroundObjects;
    //
    endBoss;
    level_end_x = 3600; // muss man ändern

    constructor(enemies, backgroundObjects, endBoss) {
        this.enemies =  enemies;
        this.backgroundObjects = backgroundObjects;
        this.endBoss = endBoss;
    }
}