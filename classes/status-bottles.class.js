class StatusBottles extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    currentBottles = 0;
    originalWidth = 240;
    originalHeight = 64;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 105;
        this.width = this.originalWidth;
        this.height = this.originalHeight;
        this.updateBottleBar();
    };

    updateBottleBar() {
        if (this.currentBottles >= 0 && this.currentBottles < this.IMAGES.length) {
            let path = this.IMAGES[this.currentBottles];
            this.img = this.imageCache[path];
        }
    }

    addBottle() {
        if (this.currentBottles < 5) {
            this.currentBottles++;
            console.log('Bottle added:', this.currentBottles);
            this.updateBottleBar();
        }
        this.animateBottleEffect();
    }

    animateBottleEffect() {
        let scale = 1;
        let scaleStep = 0.05;
        let maxScale = 1.5;
        let minScale = 1;
        let growing = true;

        let animate = () => {
            if (growing) {
                scale += scaleStep;
                if (scale >= maxScale) {
                    growing = false;
                }
            } else {
                scale -= scaleStep;
                if (scale <= minScale) {
                    this.width = this.originalWidth;
                    this.height = this.originalHeight;
                    return; // End the animation
                }
            }

            this.width = this.originalWidth * scale;
            this.height = this.originalHeight * scale;
            requestAnimationFrame(animate);
        };

        animate();
    }
}