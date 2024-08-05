class Level {
    enemies;
    endboss;
    clouds;
    bgObjects;
    coins;
    bottles;
    level_end_x = 1500;

    constructor(enemies, endboss, clouds, bgObjects, collectables) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.bgObjects = bgObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
