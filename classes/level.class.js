class Level {
    enemies;
    clouds;
    bgObjects;
    collectables;
    level_end_x = 1500;

    constructor(enemies, clouds, bgObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bgObjects = bgObjects;
        this.collectables = collectables;
    }
}
