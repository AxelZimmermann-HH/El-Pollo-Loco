class StatusEnemy extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    endbossEnergy = 5;

    constructor(endbossEnergy) {
        super();
        this.loadImage(this.IMAGES[this.endbossEnergy]);
        this.x = 460;
        this.y = 2.5;
        this.width = 240;
        this.height= 64;
    };

    /**
     * Reduces the value of endBossEnergy and loads the depending image in the status bar.
     * Selects if the endboss is hurt or dead.
     * @param {object} endboss 
     * @param {number} number 
     */
    reduceEnergy(endboss, number) {
        this.endbossEnergy--;
        if (this.endbossEnergy < 0) this.endbossEnergy = 0;
        
        this.loadImage(this.IMAGES[this.endbossEnergy]);
        let boss = endboss[number];
        if (this.endbossEnergy > 0) {
            boss.hurt();
        } else {
            boss.dead();
        };
    };
};