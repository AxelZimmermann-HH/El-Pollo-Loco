class StatusCoins extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    statusBottles;
    currentCoins = 0;
    

    constructor(statusBottles) {
        super();
        this.statusBottles = statusBottles;
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 50;
        this.width = 240;
        this.height= 64;
        this.updateCoinBar();
    };

    updateCoinBar() {
        if (this.currentCoins >= 0 && this.currentCoins < this.IMAGES.length) {
            let path = this.IMAGES[this.currentCoins];
            this.img = this.imageCache[path];
            if (this.currentCoins === this.IMAGES.length - 1) {
                setTimeout(() => {
                    this.currentCoins = 0;
                    this.changeCoinsToBottle();
                    this.updateCoinBar();
                    

                }, 1000); // Display the full bar for 1 second
            }
        }
    }

    changeCoinsToBottle() {
        this.statusBottles.addBottle();
    }

    addCoin() {
        if (this.currentCoins < this.IMAGES.length - 1) {
            this.currentCoins++;
            this.updateCoinBar();
        } else {
            this.currentCoins = this.IMAGES.length - 1;
            this.updateCoinBar();
        }
    }
}