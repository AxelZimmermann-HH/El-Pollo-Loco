class Level {
    enemies;
    clouds;
    bgObjects;
    coins;
    bottles;
    level_end_x = 1500;

    constructor(enemies, clouds, bgObjects, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bgObjects = bgObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
