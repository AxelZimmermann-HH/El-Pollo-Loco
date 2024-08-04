class StatusCoins extends DrawableObject {

    IMAGES = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    percentage = 100;
    

    constructor() {
        super();
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

    

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        };
    };
}