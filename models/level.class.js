class Level {
    enemies;
    backgroundObjects;
    level_end_x = 3000;

    constructor(enemies, backgroundObjects) {
        this.enemies =  enemies;
        this.backgroundObjects = backgroundObjects;
    }
}