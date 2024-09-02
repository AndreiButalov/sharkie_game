class Level {
    enemies;
    backgroundObjects;
    level_end_x = 3600; // muss man ändern

    constructor(enemies, backgroundObjects) {
        this.enemies =  enemies;
        this.backgroundObjects = backgroundObjects;
    }
}